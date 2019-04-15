//手机号码
export const mbExp=/^1[34578]\d{9}$/;
//座机号码
export const telExp=/^((0[0-9]{2}-*[0-9]{8})|(0[0-9]{3}-*[0-9]{7}))$/;
//手机+座机
export const mbAndTelExp=/^(1[3-9]\d{9})|((0[0-9]{2}-*[0-9]{8})|(0[0-9]{3}-*[0-9]{7}))$/;
//身份证号码
export const certNoExp=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//邮箱
export const emailExp=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//邮政编码
export const postExp= /^[1-9]\d{5}$/g;
//传真
export const faxExp= /^(\d{3,4}-)?\d{7,8}$/;
//正整数(不包含0和小数)
export const posInteExp= /^[1-9]\d*$/;

//正整数(包含0和小数)
export const posInteExp2= /^(0|[1-9][0-9]*)$/;

//非负数
export const numExp= /^(([1-9]\d*\.\d+)|([1-9]\d*)|(0\.\d+)|(0))$/;
//金额
export const moneyExp= /^([1-9]{1,3}(\,\d{3})*\.\d+)$/;





