export function activeNav(expectedPath, currentPath) {
    if (expectedPath === currentPath) {
        return true
    }
    return false
}