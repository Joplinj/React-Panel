export const ACTIVE_PAGE = "ACTIVE_PAGE";

export function ActivePage(item) {
    return { 
        type: ACTIVE_PAGE, 
        payload: item.title 
    }
}