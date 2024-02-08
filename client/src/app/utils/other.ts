export function getRandomElements(array: any[], numberOfElements: number) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numberOfElements);
}