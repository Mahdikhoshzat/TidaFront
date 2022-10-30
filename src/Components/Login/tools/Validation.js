export const Validation = (data) => {
    const errors = {}

    if(!data.username.trim()){
        errors.username = "User Name is required"
    }
    else{
        delete errors.username
    }
    if(!data.password){
        errors.password = "Password is required"
    }
    else{
        delete errors.password
    }
    return errors
}