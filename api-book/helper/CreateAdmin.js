const User = require('../models/User')
const createAdmin = async() => {
    try {
        let user = await User.findOne({email:'admin@rdec.in'})
        if(!user){
        user = new User();
        user.firstName = 'Admin'
        user.email = 'admin@rdec.in'
        user.password = '123456';
        user.userType = 1 ;
        await user.save();
        console.log('Admin created sucessfully...')
        } else{
            console.log('Admin Already created...')
        }
        
    } catch (error) {
        console.log( error.message , ' problem in admin creation');
    }
}
module.exports = createAdmin