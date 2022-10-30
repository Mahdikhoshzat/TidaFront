export const Token = () => {
    const rand  = () => {
        return Math.random().toString(36).substr(2);
    };
    
    const tokenize = () => {
        return rand() + rand();
    };
    
    return tokenize()
}