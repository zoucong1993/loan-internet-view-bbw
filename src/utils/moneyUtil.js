const moneyUtil = {
    /**
     * 把表示金额的数字转换为三点一逗格式，如100000000 => 100,000,000.00
     */
    thousandsChange: function (value) {
        if (value === null || value === undefined) {
            value = "";
        }
        let valueStr = value.toString();
        value = this.deThousandsChange(value);
        if (value) {
            valueStr = value.toString();
            if (/^(\+|-)?\d+(\.\d+)?$/.test(valueStr)) {
                let decimal = "";
                let pointIndex = valueStr.indexOf('.');
                if (pointIndex != -1) {
                    decimal = valueStr.substring(pointIndex + 1);
                    valueStr = valueStr.substring(0, pointIndex);
                }
                let re = new RegExp().compile("(\\d)(\\d{3})(,|\\.|$)");
                valueStr += "";
                while (re.test(valueStr)) {
                    valueStr = valueStr.replace(re, "$1,$2$3");
                }
                if (decimal) {
                    valueStr += "." + decimal;
                } else {
                    valueStr += "." + "00";
                }
            }
        }
        return valueStr;
    },
    /**
     * 把表示金额的三点一逗格式转换为正常数字，100,000,000.00 => 100000000.00
     */
    deThousandsChange: function (value) {
        if (value === null || value === undefined) {
            value = "";
        }
        let valueStr = value.toString();
        if (value) {
            valueStr = value.toString();
            valueStr = valueStr.replace(/,/g, "");
        }
        return valueStr;
    }
};

export default moneyUtil