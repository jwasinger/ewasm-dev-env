const assert = require('assert')

function to_padded_hex(value) {
    if (typeof(value) === "number" || typeof(value) === "bigint") {
        value = value.toString(16)
    } else {
        assert(typeof(value) === "string")
    }
    if (value.length % 2 !== 0) {
        return "0" + value
    }
    return value
}

// evm384 element size in bytes
const SIZE_F = 48

function to_evm384_addressing_mode(start, offset) {
    return (offset - start) / SIZE_F
}

function from_evm384_addressing_mode(start, offset) {
    return (offset - start)  * SIZE_F
}

// convert a uint64 to a padded little endian hex string
function uint32_to_be_hex_string(num) {
    result = num.toString(16)
    fill_length = 4 - result.length

    if (fill_length > 0) {
        result = "0".repeat(fill_length) + result
        //result = result + "0".repeat(fill_length)
    }

    return result
}

function encode_offsets(out, x, y, curve_params) {
    return uint32_to_be_hex_string(out) +
        uint32_to_be_hex_string(x) +
        uint32_to_be_hex_string(y) +
        uint32_to_be_hex_string(curve_params)
}

function gen_mstore(offset, value) {
    return gen_push(value) + gen_push(offset) + "52"
}

function gen_mload() {
    return "51"
}

function gen_iszero() {
    return "15"
}

function gen_eq() {
    return "14"
}

function gen_or() {
    return "17"
}

function gen_shl() {
    return "1b"
}

function gen_shr() {
    return "1c"
}

function gen_jumpdest() {
    return "5b"
}

function gen_jumpi() {
    return "57"
}

function gen_callvalue() {
    return "34"
}

function gen_calldatacopy() {
    return "37"
}

function gen_return(offset, n_bytes) {
    return gen_push(n_bytes) + gen_push(offset) + "f3"
}

function gen_revert() {
    return "fd";
}

function gen_with_immediate(base_op, value) {
    value = to_padded_hex(value)

    if (value.length > 64) {
        throw("push value size must not be larger than 32 bytes")
    } else if (value.length < 2) {
        throw("push value size must not be smaller than 1 byte")
    }

    return to_padded_hex(base_op + (value.length / 2) - 1) + value
}

function gen_push(value) {
    return gen_with_immediate(0x60, value)
}

function gen_dup(value) {
    assert(value >= 1 && value <= 16)
    return to_padded_hex(0x80 + value - 1)
}

function gen_swap(value) {
    assert(value >= 1 && value <= 16)
    return to_padded_hex(0x90 + value - 1)
}

const constants  = {
    SIZE_F: 48,
    OP_ADDMOD384: "c0",
    OP_SUBMOD384: "c1",
    OP_MULMODMONT384: "c2",
}

module.exports = {
    gen_addmod384: (offset_out, offset_x, offset_y, offset_mod) => {
        return gen_push(encode_offsets(offset_out, offset_x, offset_y, offset_mod)) + constants.OP_ADDMOD384
    },
    gen_submod384: (offset_out, offset_x, offset_y, offset_mod) => {
        return gen_push(encode_offsets(offset_out, offset_x, offset_y, offset_mod)) + constants.OP_SUBMOD384
    },
    gen_mulmodmont384: (offset_out, offset_x, offset_y, offset_mod) => {
        return gen_push(encode_offsets(offset_out, offset_x, offset_y, offset_mod)) + constants.OP_MULMODMONT384
    },
    gen_push: gen_push,
    gen_dup: gen_dup,
    gen_swap: gen_swap,
    // store single 32 byte word at offset
    gen_mstore: gen_mstore,
    gen_mload: gen_mload,
    gen_iszero: gen_iszero,
    gen_eq: gen_eq,
    gen_or: gen_or,
    gen_shl: gen_shl,
    gen_shr: gen_shr,
    gen_jumpdest: gen_jumpdest,
    gen_jumpi: gen_jumpi,
    gen_callvalue: gen_callvalue,
    gen_calldatacopy: gen_calldatacopy,
    gen_return: gen_return,
    gen_revert: gen_revert,
    constants: constants,
    to_evm384_addressing_mode: to_evm384_addressing_mode,
    from_evm384_addressing_mode: from_evm384_addressing_mode
}
