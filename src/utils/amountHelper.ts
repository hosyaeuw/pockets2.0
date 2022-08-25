export class AmountHelper {
    static format = (value: number) => (value > 9999 ? value.toLocaleString('ru') : value);
}
