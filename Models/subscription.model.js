import mongoose from 'mongoose';
const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: [3, 'Subscription name must be at least 3 characters long'],
        maxLength: [50, 'Subscription name must be at most 50 characters long']},
        currency: {
            type: String,  
            enum: ['USD', 'EUR', 'GBP'],
            default: 'USD'
        },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'], 
        min: [0, 'Price must be greater than 0']
    },    
    frequency: {
        type: String,
        enum : ['daily', 'weekly', 'monthly', 'yearly'],
     

    },
    category: {
        type: String,
        enum : ['basic', 'premium', 'enterprise'],
        required: [true, 'Subscription category is required']
    },
    paymentMethod: {
        type: String,
        enum : ['credit card', 'paypal', 'bank transfer'],
        required: [true, 'Payment method is required']
    },
    status: {
        type: String,
        enum : ['active', 'inactive', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
            
        }

    },
    renewalDate: {
        type: Date,
        required: [true, 'Renewal date is required'],   
        validate: {
            validator: function(value){ 
                return value > this.startDate
            },
            message: 'Renewal date must be after start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },

}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'inactive';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;    