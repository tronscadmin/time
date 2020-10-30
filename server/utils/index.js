exports.abbreviateNumber = (item, precision) => {
    let _0xe5a7x22 = parseFloat(item);
    if (_0xe5a7x22 === null) {
        return null;
    }
    if (_0xe5a7x22 === 0) {
        return "0";
    }
    precision = !precision || precision < 0 ? 0 : precision;
    const _0xe5a7x23 = _0xe5a7x22["toPrecision"](2)["split"]("e"),
        _0xe5a7x24 =
            _0xe5a7x23["length"] === 1
                ? 0
                : Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
        _0xe5a7x25 =
            _0xe5a7x24 < 1
                ? _0xe5a7x22["toFixed"](0 + precision)
                : (_0xe5a7x22 / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
                    1 + precision
                ),
        _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math["abs"](_0xe5a7x25),
        response = _0xe5a7x26 + ["", "K", "M", "B", "T"][_0xe5a7x24];
    return response;
};