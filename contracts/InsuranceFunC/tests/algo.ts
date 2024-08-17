import { BitString, Builder, Cell, Slice, beginCell } from "@ton/core";
type VoteAccept = {
    position: number;
    id: number;
}

const bitsStandart = 1023;
const bitsStandartReader = 255;

export class InsuranceJS {
    readonly cntCells: number
    private cell: Cell
    private cntVotes: number

    constructor(readonly countMintNft: number) {
        this.cntCells = Math.ceil(countMintNft/bitsStandart);
        this.cntCells = Math.ceil((countMintNft + this.cntCells)/bitsStandart)

        this.cell = this.fill4().endCell();
        this.cntVotes = 0
    }

    vote(id: number) : boolean{
        if (id >= this.countMintNft) throw new Error("id > countMintNft")
        const vote = {
            position: Math.floor(id / (bitsStandart-1)),
            id: id % (bitsStandart-1)
        }
        // const [bld, voted] = this.fillValues4(this.cell.beginParse(), vote)
        
        // this.cell = bld.endCell()
        // this.cntVotes += voted ? 1 : -1
        // return voted;

        console.log(vote)
        return false;
        /*
        const bld = this.cell.beginParse();
        
        let row = 0;
        let index = 0;
        let temp = 1;
        const columns = []
        const lo = []

        for (let i = 0; temp <= positionCell; i++, temp += 4**i) {
            row = i;
            index = positionCell - temp;
            lo.push(temp)
        }

        temp = positionCell
        for (let i = row; i > 0; i--) {
            temp = Math.floor((temp-lo[i])/4)
            columns.push(temp)
            temp += lo[i-1]
        }
        columns.push(0)
        columns.reverse()
        */
        
    }
    private fill4( depth : number = 0, m: number = 4) : Builder {
        const bld = this.fill(this.countMintNft + this.cntCells - bitsStandart*depth);  // Заполняем ячейку
    
        m*=4 // Увеличиваем до актуального ряда
        depth = fnNextDepth(depth, m) // Понимаем какую мы ячейку заполняем
    
        let nextDepth = fnNextDepth(depth, m) // Узнаём какую ячейку мы будем заполнять
        for (let i = 0; i < 4 && depth < this.cntCells; i++, depth++, nextDepth+=4) {
            // Узнаём есть ли смысл эту ячейку ещё размножать
            if (nextDepth < this.cntCells){ 
                // Размножаем ячейку через рекурсию
                bld.storeRef(
                    this.fill4(depth, m)
                ).endCell();
            } else {
                // Заполняем ячейку
                bld.storeRef(
                    this.fill(this.countMintNft + this.cntCells - bitsStandart*depth)
                ).endCell();
            }
        }
        return bld
    }
    private fillValues4(oldCell: Slice, vote: VoteAccept, depth : number = 0, m: number = 4) : [Builder, boolean] {
        let checkVote = false;
        let bits = this.countMintNft - bitsStandart*depth
        let edit = oldCell.loadUint(1)
        if (vote.position == depth) {
            
        }
        let bld = this.fill(bits);
        
        m*=4; 
        depth = fnNextDepth(depth, m);
        
        let nextDepth = fnNextDepth(depth, m);
        for (let i = 0; i < 4 && depth < this.cntCells; i++, depth++, nextDepth+=4) {
            const cell = oldCell.loadRef().beginParse()
            if (nextDepth < this.cntCells){
                const [nextBld, newVote] = this.fillValues4(cell, vote, depth, m)

                bld.storeRef(
                    nextBld
                ).endCell();
                
                checkVote = checkVote || newVote
                continue
            }

            bits = this.countMintNft - bitsStandart*depth
            
            bld.storeRef(this.fill(bits)).endCell();
        }
        return [bld, checkVote]
    }
    getCell(){
        return this.cell;
    }
    getCountVotes() {
        return this.cntVotes;
    }
    private fill(cntBits: number) : Builder{
        const bits = cntBits >= bitsStandart ? bitsStandart : cntBits;
        return beginCell().storeUint(0, bits)
    }

    private fillBits(edit: number, bits: BitString) : Builder {
        return beginCell().storeUint(edit, 1).storeBits(bits)
    }
}

function sumDepth(n : number) {
    let rt = 1
    while (n > 1) {
        rt += n
        n/=4
    }
    return rt;
}

function fnNextDepth(n:number, m:number){
    return n + m + (n - sumDepth(m/4))*3
}
/*
export function processVotes(countMintNft: number): Cell {
    const countCells = Math.ceil(countMintNft/bitsStandart);
    return fill4V1(countCells, 4, countMintNft).endCell()
};

export function processVotesV2(countMintNft: number): Cell {
    const countCells = Math.ceil(countMintNft/bitsStandart);
    return fill4V2(countCells, 1, countMintNft, 1).endCell()
};

function fill4V1(countCells : number, depth : number, countMintNft : number, j: number = 0) : Builder {
    const bld = fill(countMintNft)
    countMintNft -= bitsStandart
    const steps = Math.ceil(countMintNft/bitsStandart);

    for (let i = 0; i < 4 && i < steps; i++) {
        const temp = fill(countMintNft - bitsStandart*i);
        const cntNext = sumDepth(depth) + i*4 + j * 4;

        if (cntNext <= countCells && cntNext) {
            const newCountBits = countMintNft - (depth + i*4 - 1)*bitsStandart
            bld.storeRef(
                    fill4V1(countCells, depth*4, newCountBits, i)
                ).endCell();
        } else {
            bld.storeRef(temp);
        }
    }
    
    return bld
}

function fill4V2(countCells : number, depth : number, countMintNft : number, m: number) : Builder {
    const bld = fill(countMintNft)
    countMintNft -= bitsStandart
    const steps = Math.ceil(countMintNft/bitsStandart);
    
    depth += m
    for (let i = 0; i < 4 && i < steps; i++, depth+=4) {
        const temp = fill(countMintNft - bitsStandart*i);
        if (depth <= countCells) {
            const newCountBits = countMintNft - bitsStandart*(m - i + 4*i - 1)
            bld.storeRef(
                    fill4V2(countCells, depth, newCountBits, m*4)
                ).endCell();
        } else {
            bld.storeRef(temp);
        }
    }
    return bld
}
*/