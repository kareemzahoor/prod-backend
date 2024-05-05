import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
  // step of register usesr controller

  // get user details from frontend
  // validation - check not empty
  // check if user already exits: username or password
  // check for images, like avatar or coverimage
  // upload them to cloudinary
  // create user object, create db entry
  // remove password and refresh token in form field reponse
  // return response

  const { username, email, password, fullName } = req.body;
  console.log('🚀 ~ registerUser ~ req.body:', req.body);

  if (
    [username, email, password, fullName].some((fields) => {
      return fields?.trim === ('' || undefined);
    })
  ) {
    throw new ApiError(400, 'All fields are required!');
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists!');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path
   }

  console.log('🚀 ~ registerUser ~ req.files:', req.files);
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is required!');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, 'Avatar is requires');
  }

  const user = await User.create({
    fullName,
    username: username?.toLowerCase(),
    email,
    password,
    avatar: avatar?.url,
    coverImage: coverImage?.url || '',
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user!');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User registered successfully!'));
});

export { registerUser };
