export const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatInfoTitleList = (list: {title: string, isProvide: boolean}[]) => {
    return list.filter(item => item.isProvide).map(item => item.title)
}
