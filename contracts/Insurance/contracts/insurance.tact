import "@stdlib/deploy";
import "./funcs.tact";
import "./messages.tact";

struct Vote {
    position: Int as uint32;
    id : Int as uint32;
}

contract Insurance {
    count_nft: Int as uint32;
    id: Int as uint32;
    nft_collection: Address;
    nft_init: Cell;

    // private
    count_cells: Int as uint8;
    count_votes: Int as uint32;
    bits_before_index: Int;
    bits_index: Int;
    votes_cell : Cell?;
    path_to_index: Int;

    init(count_nft: Int, id: Int, nft_collection:Address, nft_init: Cell, bits_before_index: Int, bits_index : Int,  path_to_index: Int) {
        self.count_nft = count_nft;
        self.id = id;
        self.nft_collection = nft_collection;
        self.nft_init = nft_init;

        self.count_cells = 1 + (count_nft * (1 + BITS)) / (BITS * BITS);
        self.count_votes = 0;
        self.bits_before_index = bits_before_index;
        self.bits_index = bits_index;
        // end = 0; load_ref skip = 1; load_ref enter = 2 INPUT REVERSE
        self.path_to_index = path_to_index;  // 211 it's lrSkip -> lrSkip -> lrEnter
    }
    fun calcCountBits(depth : Int): Int {
        return self.count_nft + self.count_cells - BITS * depth;
    }

    fun fill4(depth: Int, m: Int) : Builder {
        let bld: Builder = emptyBits(self.calcCountBits(depth));

        m *= 4; depth = nextDepth(depth, m);
        let nxt : Int = depth;
        let i : Int = 0;

        while ((i < 4) && (depth < self.count_cells)) {
            if (nxt < self.count_cells) {
                bld = bld.storeRef(self.fill4(depth, m).endCell());
            } else {
                bld = bld.storeRef(emptyBits(self.calcCountBits(depth)).endCell());
            }

            i += 1; depth += 1; nxt += 4;
        }
        return bld;
    }

    fun fillValues4(old: Slice, vote: Vote, depth: Int, m: Int) : Builder{
        let is_edit: Int = old.loadUint(1);
        let bld: Builder = beginCell();
        if (vote.position == depth) {
            let vote_cell : VoteCellOutput = createVoteCell(old, vote.id);
            bld = vote_cell.bld;
            self.count_votes += vote_cell.cnt; 
        } else {
            if (is_edit == 1){
                bld = copyInfo(old);
            } else {
                bld = emptyBits(self.calcCountBits(depth));
            }
        }
        m *= 4; depth = nextDepth(depth, m);
        let nxt: Int = depth;
        let i: Int = 0;
        
        while ((i < 4) && (depth < self.count_cells)) {
            let new_old : Slice = old.loadRef().beginParse();
            is_edit = new_old.loadUint(1);
            if (nxt < self.count_cells) {
                bld = bld.storeRef(self.fillValues4(new_old, vote, depth, m).endCell());
            } else {
                if (vote.position == depth){
                    let vote_cell : VoteCellOutput = createVoteCell(new_old, vote.id);
                    bld = bld.storeRef(vote_cell.bld.endCell());
                    self.count_votes += vote_cell.cnt;
                } else if (is_edit == 1) {
                    bld = bld.storeRef(copyInfo(new_old).endCell());
                } else {
                    bld = bld.storeRef(emptyBits(self.calcCountBits(depth)).endCell());
                }
            }

            i += 1; depth += 1; nxt += 4;
        }
        return bld;
    }

    fun vote(index : Int) : Cell {
        let v: Vote = Vote{
            position : index / (BITS - 1),
            id : index % (BITS - 1)
        };
        let old_cell : Cell = self.votes_cell!!;
        let _before : Int = self.count_votes;

        self.votes_cell = self.fillValues4(old_cell.beginParse(), v, 0, 4).endCell();
        let msg : StringBuilder = beginString();
        msg.append("Your vote ");
        if (_before < self.count_votes) {
            msg.append("accepted");
        } else {
            msg.append("canceled");
        }

        return msg.toCell();
    }

    receive(deploy: Deploy){
        if (self.votes_cell == null && self.count_votes == 0){
            self.votes_cell = self.fill4(0, 4).endCell();
        }

        self.notify(DeployOk{queryId: deploy.queryId}.toCell());
    }

    receive(msg: OwnershipAssigned){
        dump(self.count_votes);
        let ctx: Context = context();
        let payload : Slice = msg.forward_payload.loadRef().beginParse();
        let contract_address : Address = contractAddress(StateInit{
            code: self.nft_init,
            data: payload.asCell()
        });
        require(ctx.sender == contract_address, "Only nft from collection");

        let path : Int = self.path_to_index;

        while (path > 0) {
            let _m : Int = path % 10;
            if (_m == 1) {
                payload.loadRef();
            } else if (_m == 2) {
                payload = payload.loadRef().beginParse();
            }
            path = path / 10;
        }

        payload.loadBits(self.bits_before_index);
        let index: Int = payload.loadUint(self.bits_index);
        let answer : Cell = self.vote(index);
        let body : Transfer = Transfer{
            query_id: msg.query_id,
            new_owner: msg.prev_owner,
            response_destination: null,
            custom_payload: null,
            forward_amount: 100,
            forward_payload: beginCell().endCell().beginParse()
        };

        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: 64,
            bounce: false,
            body: body.toCell()
        });
    }

    get fun votes_cells() : Cell? {
        return self.votes_cell;
    }
}
