export function titleize(str) {
    if (!str) {
        return str;
    }

    return str
        .split(" ")
        .map(function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        })
        .join(" ")
        .split("_")
        .map(function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        })
        .join(" ");
}