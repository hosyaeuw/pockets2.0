class RandomHelper {
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static choice(array: any[]) {
        return array[RandomHelper.getRandomInt(0, array.length - 1)];
    }
}

export default RandomHelper;
