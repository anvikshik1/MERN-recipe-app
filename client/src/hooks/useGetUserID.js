export const useGetUserID = (key) => {
    return window.localStorage.getItem(key)
}