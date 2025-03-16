// import mongoose ,{Document, Model,Schema, Types} from "mongoose";
// import { IUser } from "./user.model";



// interface IComment extends Document{
//     user:IUser,
//     question:string,
//     questionReplies : IComment[]
// }

// interface IReview extends Document{
//     user:IUser,
//     rating:number,
//     comment:string,
//     commentReplies:IComment[]
// }

// interface ILink extends Document{
//     title:string,
//     url:string
// }

// interface ICourseData extends Document{
//     title:string,
//     description:string,
//     videoUrl:string,
//     videoThumbnail:object,
//     videoSection:string,
//     videoLength:number,
//     videoPlayer:string,
//     links:ILink[],
//     suggestion:string
//     questions:IComment[]
// }

// export interface ICourse extends Document{
//     _id: Types.ObjectId; 
//     name:string,
//     description:string,
//     price:number,
//     estimatedPrice:number,
//     thumbnail:object,
//     tags:string,
//     level:string,
//     demoUrl:string,
//     benefits:{title:string}[],
//     prerequisites:{title:string}[],
//     reviews:IReview[]
//     courseData:ICourseData[],
//     ratings?:number,
//     purchased?:number
// }

// const reviewSchema = new Schema<IReview>({
//     user:Object,
//     rating:{
//         type:Number,
//         default:0
//     },
//     comment:String,
//     commentReplies : [Object]
// },{timestamps:true})

// const linkSchema = new Schema<ILink>({
//     title:String,
//     url:String
// })

// const commentSchema = new Schema<IComment>({
//     user:Object,
//     question:String,
//     questionReplies:[Object]
// },{timestamps:true})

// const courseDataSchema = new Schema<ICourseData>({
//     videoUrl:String,
//     title:String,
//     videoSection:String,
//     description:String,
//     videoLength:Number,
//     videoPlayer:String,
//     links:[linkSchema],
//     suggestion:String,
//     questions:[commentSchema]
// })

// const courseSchema = new Schema<ICourse>({
//     name: {
//       type: String,
//       required: true, // Required field
//     },
//     description: {
//       type: String,
//       required: true, // Required field
//     },
//     price: {
//       type: Number,
//       required: true, // Required field
//     },
//     estimatedPrice: {
//       type: Number, // Optional field
//     },
//     thumbnail: {
//       public_id: {
//         type: String, // Store the Cloudinary public ID for the image
//       },
//       url: {
//         type: String, // Store the URL of the thumbnail
//       },
//     },
//     tags: {
//       type: String,
//       required: true, // Required field
//     },
//     level: {
//       type: String,
//       required: true, // Required field
//     },
//     demoUrl: {
//       type: String,
//       required: true, // Required field
//     },
//     benefits: [{
//       title: {
//         type: String, // Benefit title (optional array of titles)
//       },
//     }],
//     prerequisites: [{
//       title: {
//         type: String, // Prerequisite title (optional array of titles)
//       },
//     }],
//     reviews: [reviewSchema], // Reference to the review schema
//     courseData: [courseDataSchema], // Reference to the course data schema
//     ratings: {
//       type: Number,
//       default: 0, // Default rating is 0
//     },
//     purchased: {
//       type: Number,
//       default: 0, // Default purchased count is 0
//     },
//   }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


// const CourseModel:Model<ICourse> = mongoose.model('Course',courseSchema)
// export default CourseModel
import mongoose ,{Document, Model,Schema, Types} from "mongoose";
import { IUser } from "./user.model";



interface IComment extends Document{
    user:IUser,
    question:string,
    questionReplies : IComment[]
}

interface IReview extends Document{
    user:IUser,
    rating:number,
    comment:string,
    commentReplies:IComment[]
}

interface ILink extends Document{
    title:string,
    url:string
}

interface ICourseData extends Document{
    title:string,
    description:string,
    videoUrl:string,
    videoThumbnail:object,
    videoSection:string,
    videoLength:number,
    videoPlayer:string,
    links:ILink[],
    suggestion:string
    questions:IComment[]
}

export interface ICourse extends Document{
    _id: Types.ObjectId; 
    name:string,
    description:string,
    price:number,
    estimatedPrice:number,
    thumbnail:object,
    tags:string,
    level:string,
    demoUrl:string,
    benefits:{title:string}[],
    prerequisites:{title:string}[],
    reviews:IReview[]
    courseData:ICourseData[],
    ratings?:number,
    purchased?:number,
    publisher: mongoose.Schema.Types.ObjectId[]

}

const reviewSchema = new Schema<IReview>({
    user:Object,
    rating:{
        type:Number,
        default:0
    },
    comment:String,
    commentReplies : [Object]
})

const linkSchema = new Schema<ILink>({
    title:String,
    url:String
})

const commentSchema = new Schema<IComment>({
    user:Object,
    question:String,
    questionReplies:[Object]
})

const courseDataSchema = new Schema<ICourseData>({
    videoUrl:String,
    title:String,
    videoSection:String,
    description:String,
    videoLength:Number,
    videoPlayer:String,
    links:[linkSchema],
    suggestion:String,
    questions:[commentSchema]
})

const courseSchema = new Schema<ICourse>({
    name: {
      type: String,
      required: true, // Required field
    },
    description: {
      type: String,
      required: true, // Required field
    },
    price: {
      type: Number,
      required: true, // Required field
    },
    estimatedPrice: {
      type: Number, // Optional field
    },
    thumbnail: {
      public_id: {
        type: String, // Store the Cloudinary public ID for the image
      },
      url: {
        type: String, // Store the URL of the thumbnail
      },
    },
    tags: {
      type: String,
      required: true, // Required field
    },
    level: {
      type: String,
      required: true, // Required field
    },
    demoUrl: {
      type: String,
      required: true, // Required field
    },
    benefits: [{
      title: {
        type: String, // Benefit title (optional array of titles)
      },
    }],
    prerequisites: [{
      title: {
        type: String, // Prerequisite title (optional array of titles)
      },
    }],
    reviews: [reviewSchema], // Reference to the review schema
    courseData: [courseDataSchema], // Reference to the course data schema
    ratings: {
      type: Number,
      default: 0, // Default rating is 0
    },
    purchased: {
      type: Number,
      default: 0, // Default purchased count is 0
    },
    publisher:[{
      type:Schema.Types.ObjectId,
      ref:'user',
      required: true
    }]
  }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


const CourseModel:Model<ICourse> = mongoose.model('Course',courseSchema)
export default CourseModel