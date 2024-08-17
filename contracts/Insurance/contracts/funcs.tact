import "./consts.tact";
import "./imports/stdlib.fc";

struct VoteCellOutput {
    bld: Builder;
    cnt: Int;
}

fun sumDepth(n: Int) : Int{
    let rt : Int = 1;
    while (n > 1) {rt += n; n /= 4;}
    return rt;
}
fun nextDepth(depth: Int, m: Int) : Int{
    return depth + m + (depth - sumDepth(m / 4)) * 3;
}
fun emptyBits(bits: Int) : Builder {
    bits = min(bits, BITS);
    let rtn : Builder = beginCell();
    while (bits >= 256){
        rtn = rtn.storeUint(0, 256);
        bits -= 256;
    }
    let remant: Int = bits % 256;
    return rtn.storeUint(0, remant);
}

fun copyInfo(old: Slice) : Builder{
    let count_bits: Int = old.bits();

    let rtn: Builder = beginCell();
    rtn = rtn.storeUint(1, 1);

    while (count_bits >= 256){
        rtn = rtn.storeUint(old.loadUint(256), 256);
        count_bits -= 256;
    }

    let remant: Int = count_bits % 256;
    let value: Int = old.loadUint(remant);

    return rtn.storeUint(value, remant);
}


fun createVoteCell(old: Slice, id: Int): VoteCellOutput{
    let bld: Builder = beginCell();
    let rtn : Int = 0; 

    bld = bld.storeUint(1, 1);
    // Узнаём сколько шагов до id
    let steps: Int = id / 256;
    while (steps > 0){
        // Подгружаем все скипнутые значения
        bld = bld.storeUint(old.loadUint(256), 256);
        steps -= 1;
    }
    // Узнаём сколько бит необходимо подгрузить
    let bits: Int = min(256, old.bits());
    // Достаём значение
    let value: Int = old.loadUint(bits);
    // Создаём маску голоса
    let bit_mask: Int = 1 << (id % 256);
    // Проверям проголосовал данный id или нет
    if (value & bit_mask == 0) {
        rtn = 1;
        value += bit_mask;
    } else {
        rtn = -1;
        value -= bit_mask;
    }
    // Сохраняем новое значение
    bld = bld.storeUint(value, bits);
    // Подгружаем остатки
    bits = old.bits();
    while (bits >= 256){
        bld = bld.storeUint(old.loadUint(256), 256);
        bits -= 256;
    }
    bld = bld.storeUint(old.loadUint(bits % 256), bits % 256);
    
    return VoteCellOutput{
        bld: bld, 
        cnt: rtn
    };
}