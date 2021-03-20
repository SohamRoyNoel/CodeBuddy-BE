const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// @desc    Registration
// @route   POST
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({ success: true })
});

// @desc    Login
// @route   POST
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Error("parameters needed"))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new Error("Invalid email"));
    }

    const isPasswordCorrect = await user.signInWithJwt(password);

    if (!isPasswordCorrect) {
      return next(new Error("Invalid password"));
    }

    const token = user.getJwtToken();

    res.status(200).json({ success: true, token })
})

