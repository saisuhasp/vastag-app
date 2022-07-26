const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleWare/authenticateCus")
const authenticatePro = require("../middleWare/authenticatePro")
require('../db/conn');
const fs = require('fs')
const Customer = require("../models/customerModel");
const Professional = require("../models/pro.model");
const Transaction = require("../models/transactionModel")

const formidable = require("formidable");
router.get('/', (req, res) => {
    res.send('Hello world router js');
});

//using promises

// router.post('/signup-customer',(req,res)=>{

//     const { fullname, email, phoneNo,password ,cpassword,address,city,state,gender} = req.body;

//     if(!fullname || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !gender){
//     return res.status(422).json({error: "Please fill the fields properly" });  
//     }
//     Customer.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//     return res.status(422).json({error: "Email already exist" });  
//         }

//         const user = new Customer({fullname, email, phoneNo,password ,cpassword,address,city,state,gender});
//         user.save().then(()=>{
//             res.status(201).json({message:"User added successfully in the database"});
//         }).catch((err)=> res.status(500).json({error:"Failed to add to the database"}))

//     }).catch(err=>{console.log(err)} );
// });




// using aysnc 

router.post('/signup-customer', async (req, res) => {

    const { name, email, phoneNo, password, cpassword, address, city, state, gender } = req.body;
    const states = ["andhra pradesh", "arunachal pradesh", "bihar", "chhattisgarh", "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka", "kerala", "assam", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana", "tripura", "uttarakhand", "uttar pradesh", "west bengal"]
    const cities = ['abohar', 'achalpur', 'adilabad', 'adityapur', 'adoni', 'agartala', 
    'agra', 'ahmadabad', 'ahmadnagar', 'aizawl', 'ajmer', 'akbarpur', 'akola', 'alandur', 'alappuzha',
     'aligarh', 'allahabad', 'alwar', 'ambala', 'ambala sadar', 'ambarnath', 'ambattur', 'ambikapur', 
     'ambur', 'amravati', 'amreli', 'amritsar', 'amroha', 'anand', 'anantapur', 'anantnag', 'arrah', 
     'asansol', 'ashoknagar kalyangarh', 'aurangabad', 'aurangabad', 'avadi', 'azamgarh', 'badlapur', 
     'bagaha', 'bagalkot', 'bahadurgarh', 'baharampur', 'bahraich', 'baidyabati', 'baleshwar town', 
     'ballia', 'bally', 'bally city', 'balurghat', 'banda', 'bankura', 'bansberia', 'banswara', 
     'baran', 'baranagar', 'barasat', 'baraut', 'barddhaman', 'bareilly', 'baripada town', 
     'barnala', 'barrackpur', 'barshi', 'basirhat', 'basti', 'batala', 'bathinda', 'beawar', 
     'begusarai', 'belgaum', 'bellary', 'bangalore', 'bettiah', 'betul', 'bhadrak', 'bhadravati',
      'bhadreswar', 'bhagalpur', 'bhalswa jahangir pur', 'bharatpur', 'bharuch', 'bhatpara', 'bhavnagar',
       'bhilai nagar', 'bhilwara', 'bhimavaram', 'bhind', 'bhiwadi', 'bhiwandi', 'bhiwani', 'bhopal', 
       'bhubaneswar town', 'bhuj', 'bhusawal', 'bid', 'bidar', 'bidhan nagar', 'biharsharif', 'bijapur', 
       'bikaner', 'bilaspur', 'bokaro steel city', 'bongaon', 'botad', 'brahmapur town', 'budaun', 
       'bulandshahr', 'bundi', 'burari', 'burhanpur', 'buxar', 'champdani', 'chandannagar', 'chandausi', 
       'chandigarh', 'chandrapur', 'chapra', 'chas', 'chennai', 'chhattarpur', 'chhindwara', 'chikmagalur',
        'chilakaluripet', 'chitradurga', 'chittaurgarh', 'chittoor', 'churu', 'coimbatore', 'cuddalore', 
        'cuttack', 'dabgram', 'dallo pura', 'damoh', 'darbhanga', 'darjiling', 'datia', 'davanagere', 'deesa',
         'dehradun', 'dehri', 'delhi', 'delhi cantonment', 'deoghar', 'deoli', 'deoria', 'dewas', 'dhanbad', 
         'dharmavaram', 'dhaulpur', 'dhule', 'dibrugarh', 'dimapur', 'dinapur nizamat', 'dindigul', 'dum dum',
          'durg', 'durgapur', 'eluru', 'english bazar', 'erode', 'etah', 'etawah', 'faizabad', 'faridabad', 
          'farrukhabad-cum-fatehgarh', 'fatehpur', 'firozabad', 'firozpur', 'gadag-betigeri', 'gandhidham', 
          'gandhinagar', 'ganganagar', 'gangapur city', 'gangawati', 'gaya', 'ghazipur', 'giridih', 'godhra', 
          'gokal pur', 'gonda', 'gondal', 'gondiya', 'gorakhpur', 'greater hyderabad', 'greater mumbai',
           'greater noida', 'gudivada', 'gulbarga', 'guna', 'guntakal', 'guntur', 'gurgaon', 'guwahati',
            'gwalior', 'habra', 'hajipur', 'haldia', 'haldwani-cum-kathgodam', 'halisahar', 'hanumangarh', 
            'haora', 'hapur', 'hardoi', 'hardwar', 'hassan', 'hastsal', 'hathras', 'hazaribag', 'hindaun', 
            'hindupur', 'hinganghat', 'hisar', 'hoshangabad', 'hoshiarpur', 'hospet', 'hosur', 'hubli-dharwad',
             'hugli-chinsurah', 'ichalkaranji', 'imphal', 'indore', 'jabalpur', 'jagadhri', 'jagdalpur', 
             'jaipur', 'jalandhar', 'jalgaon', 'jalna', 'jalpaiguri', 'jamalpur', 'jammu', 'jamnagar', 
             'jamshedpur', 'jamuria', 'jaunpur', 'jehanabad', 'jetpur navagadh', 'jhansi', 'jhunjhunun', 
             'jind', 'jodhpur', 'junagadh', 'kadapa', 'kaithal', 'kakinada', 'kalol', 'kalyani', 'kamarhati', 
             'kancheepuram', 'kanchrapara', 'kanpur', 'kanpur city', 'karaikkudi', 'karawal nagar', 
             'karimnagar', 'karnal', 'kasganj', 'kashipur', 'katihar', 'khammam', 'khandwa', 'khanna', 
             'kharagpur', 'khardaha', 'khargone', 'khora', 'khurja', 'kirari suleman nagar', 'kishanganj', 
             'kishangarh', 'kochi', 'kolar', 'kolhapur', 'kolkata', 'kollam', 'korba', 'kota', 'kozhikode', 
             'krishnanagar', 'kulti', 'kumbakonam', 'kurichi', 'kurnool', 'lakhimpur', 'lalitpur', 'latur', 
             'loni', 'lucknow', 'ludhiana', 'machilipatnam', 'madanapalle', 'madavaram', 'madhyamgram', 
             'madurai', 'mahbubnagar', 'mahesana', 'maheshtala', 'mainpuri', 'malegaon', 'malerkotla', 
             'mandoli', 'mandsaur', 'mandya', 'mangalore', 'mango', 'mathura', 'maunath bhanjan', 
             'medinipur', 'meerut', 'mira bhayander', 'miryalaguda', 'mirzapur-cum-vindhyachal', 'modinagar',
              'moga', 'moradabad', 'morena', 'morvi', 'motihari', 'mughalsarai', 'muktsar', 'munger', 'murwara',
               'mustafabad', 'muzaffarnagar', 'muzaffarpur', 'mysore', 'nabadwip', 'nadiad', 'nagaon', 'nagapattinam',
                'nagaur', 'nagda', 'nagercoil', 'nagpur', 'naihati', 'nalgonda', 'nanded waghala', 'nandurbar',
                 'nandyal', 'nangloi jat', 'narasaraopet', 'nashik', 'navi mumbai', 'navi mumbai panvel raigarh',
                  'navsari', 'neemuch', 'nellore', 'new delhi', 'neyveli', 'nizamabad', 'noida', 'north barrackpur',
                   'north dum dum', 'ongole', 'orai', 'osmanabad', 'ozhukarai', 'palakkad', 'palanpur', 'pali',
             'pallavaram', 'palwal', 'panchkula', 'panihati', 'panipat', 'panvel', 'parbhani', 'patan', 
             'pathankot', 'patiala', 'patna', 'pilibhit', 'pimpri chinchwad', 'pithampur', 'porbandar',
              'port blair', 'proddatur', 'puducherry', 'pudukkottai', 'pune', 'puri', 'purnia', 'puruliya', 
              'rae bareli', 'raichur', 'raiganj', 'raigarh', 'raipur', 'rajahmundry', 'rajapalayam', 
              'rajarhat gopalpur', 'rajkot', 'rajnandgaon', 'rajpur sonarpur', 'ramagundam', 'rampur', 'ranchi',
               'ranibennur', 'raniganj', 'ratlam', 'raurkela industrial township', 'raurkela town', 'rewa',
                'rewari', 'rishra', 'robertson pet', 'rohtak', 'roorkee', 'rudrapur', 's.a.s. nagar', 'sagar',
                 'saharanpur', 'saharsa', 'salem', 'sambalpur', 'sambhal', 'sangli miraj kupwad', 'santipur',
                 'sasaram', 'satara', 'satna', 'sawai madhopur', 'secunderabad', 'sehore', 'seoni', 'serampore', 
                 'shahjahanpur', 'shamli', 'shikohabad', 'shillong', 'shimla', 'shimoga', 'shivpuri', 'sikar', 
                 'silchar', 'siliguri', 'singrauli', 'sirsa', 'sitapur', 'siwan', 'solapur', 'sonipat',
                  'south dum dum', 'srikakulam', 'srinagar', 'sujangarh', 'sultan pur majra', 'sultanpur', 
                  'surat', 'surendranagar dudhrej', 'suryapet', 'tadepalligudem', 'tadpatri', 'tambaram',
                   'tenali', 'thane', 'thanesar', 'thanjavur', 'thiruvananthapuram', 'thoothukkudi', 'thrissur',
                    'tiruchirappalli', 'tirunelveli', 'tirupati', 'tiruppur', 'tiruvannamalai', 'tiruvottiyur',
                     'titagarh', 'tonk', 'tumkur', 'udaipur', 'udgir', 'udupi', 'ujjain', 'ulhasnagar', 'uluberia', 'unnao', 'uttarpara kotrung', 'vadodara', 'valsad', 'varanasi', 'vasai virar city', 'vellore', 'veraval', 'vidisha', 'vijayawada', 
    'visakhapatnam', 'vizianagaram', 'warangal', 'wardha', 'yamunanagar', 'yavatmal']
    if (!name || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !gender) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    }
    try {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const userExist = await Customer.findOne({ email: email });

        if (userExist) {
            return res.status(444).json({ error: "Email already exist" });
        }
        else if (!validRegex.test(email)) {
            return res.status(466).json({ error: "Invalid email" });
        }
        else if ((phoneNo.length != 10) || (isNaN(phoneNo))) {
            return res.status(455).json({ error: "Invalid Phone number" });

        }
        else if (password != cpassword) {
            return res.status(433).json({ error: "password are not matching" });
        }
        else if (!states.includes(state.toLowerCase())) {
            return res.status(477).json({ error: "state entered is invalid" });
        }
        else if (!cities.includes(city.toLowerCase())) {
            return res.status(488).json({ error: "city entered is invalid or the services are not currently present in your city" });
        }
        else {
            const user = new Customer({ name, email, phoneNo, password, cpassword, address, city, state, gender });
            const customerRegister = await user.save();
            res.status(201).json({ message: "User added successfully in the database" });
        }

    } catch (err) {
        console.log(err);
    }
});


router.post('/signup-pro', async (req, res) => {

    const { name, email, phoneNo, password, cpassword, address, city, state, profession, gender } = req.body;
    const states = ["andhra pradesh", "arunachal pradesh", "bihar", "chhattisgarh", "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka", "kerala", "assam", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana", "tripura", "uttarakhand", "uttar pradesh", "west bengal"]
    const cities = ['abohar', 'achalpur', 'adilabad', 'adityapur', 'adoni', 'agartala', 
    'agra', 'ahmadabad', 'ahmadnagar', 'aizawl', 'ajmer', 'akbarpur', 'akola', 'alandur', 'alappuzha',
     'aligarh', 'allahabad', 'alwar', 'ambala', 'ambala sadar', 'ambarnath', 'ambattur', 'ambikapur', 
     'ambur', 'amravati', 'amreli', 'amritsar', 'amroha', 'anand', 'anantapur', 'anantnag', 'arrah', 
     'asansol', 'ashoknagar kalyangarh', 'aurangabad', 'aurangabad', 'avadi', 'azamgarh', 'badlapur', 
     'bagaha', 'bagalkot', 'bahadurgarh', 'baharampur', 'bahraich', 'baidyabati', 'baleshwar town', 
     'ballia', 'bally', 'bally city', 'balurghat', 'banda', 'bankura', 'bansberia', 'banswara', 
     'baran', 'baranagar', 'barasat', 'baraut', 'barddhaman', 'bareilly', 'baripada town', 
     'barnala', 'barrackpur', 'barshi', 'basirhat', 'basti', 'batala', 'bathinda', 'beawar', 
     'begusarai', 'belgaum', 'bellary', 'bangalore', 'bettiah', 'betul', 'bhadrak', 'bhadravati',
      'bhadreswar', 'bhagalpur', 'bhalswa jahangir pur', 'bharatpur', 'bharuch', 'bhatpara', 'bhavnagar',
       'bhilai nagar', 'bhilwara', 'bhimavaram', 'bhind', 'bhiwadi', 'bhiwandi', 'bhiwani', 'bhopal', 
       'bhubaneswar town', 'bhuj', 'bhusawal', 'bid', 'bidar', 'bidhan nagar', 'biharsharif', 'bijapur', 
       'bikaner', 'bilaspur', 'bokaro steel city', 'bongaon', 'botad', 'brahmapur town', 'budaun', 
       'bulandshahr', 'bundi', 'burari', 'burhanpur', 'buxar', 'champdani', 'chandannagar', 'chandausi', 
       'chandigarh', 'chandrapur', 'chapra', 'chas', 'chennai', 'chhattarpur', 'chhindwara', 'chikmagalur',
        'chilakaluripet', 'chitradurga', 'chittaurgarh', 'chittoor', 'churu', 'coimbatore', 'cuddalore', 
        'cuttack', 'dabgram', 'dallo pura', 'damoh', 'darbhanga', 'darjiling', 'datia', 'davanagere', 'deesa',
         'dehradun', 'dehri', 'delhi', 'delhi cantonment', 'deoghar', 'deoli', 'deoria', 'dewas', 'dhanbad', 
         'dharmavaram', 'dhaulpur', 'dhule', 'dibrugarh', 'dimapur', 'dinapur nizamat', 'dindigul', 'dum dum',
          'durg', 'durgapur', 'eluru', 'english bazar', 'erode', 'etah', 'etawah', 'faizabad', 'faridabad', 
          'farrukhabad-cum-fatehgarh', 'fatehpur', 'firozabad', 'firozpur', 'gadag-betigeri', 'gandhidham', 
          'gandhinagar', 'ganganagar', 'gangapur city', 'gangawati', 'gaya', 'ghazipur', 'giridih', 'godhra', 
          'gokal pur', 'gonda', 'gondal', 'gondiya', 'gorakhpur', 'greater hyderabad', 'greater mumbai',
           'greater noida', 'gudivada', 'gulbarga', 'guna', 'guntakal', 'guntur', 'gurgaon', 'guwahati',
            'gwalior', 'habra', 'hajipur', 'haldia', 'haldwani-cum-kathgodam', 'halisahar', 'hanumangarh', 
            'haora', 'hapur', 'hardoi', 'hardwar', 'hassan', 'hastsal', 'hathras', 'hazaribag', 'hindaun', 
            'hindupur', 'hinganghat', 'hisar', 'hoshangabad', 'hoshiarpur', 'hospet', 'hosur', 'hubli-dharwad',
             'hugli-chinsurah', 'ichalkaranji', 'imphal', 'indore', 'jabalpur', 'jagadhri', 'jagdalpur', 
             'jaipur', 'jalandhar', 'jalgaon', 'jalna', 'jalpaiguri', 'jamalpur', 'jammu', 'jamnagar', 
             'jamshedpur', 'jamuria', 'jaunpur', 'jehanabad', 'jetpur navagadh', 'jhansi', 'jhunjhunun', 
             'jind', 'jodhpur', 'junagadh', 'kadapa', 'kaithal', 'kakinada', 'kalol', 'kalyani', 'kamarhati', 
             'kancheepuram', 'kanchrapara', 'kanpur', 'kanpur city', 'karaikkudi', 'karawal nagar', 
             'karimnagar', 'karnal', 'kasganj', 'kashipur', 'katihar', 'khammam', 'khandwa', 'khanna', 
             'kharagpur', 'khardaha', 'khargone', 'khora', 'khurja', 'kirari suleman nagar', 'kishanganj', 
             'kishangarh', 'kochi', 'kolar', 'kolhapur', 'kolkata', 'kollam', 'korba', 'kota', 'kozhikode', 
             'krishnanagar', 'kulti', 'kumbakonam', 'kurichi', 'kurnool', 'lakhimpur', 'lalitpur', 'latur', 
             'loni', 'lucknow', 'ludhiana', 'machilipatnam', 'madanapalle', 'madavaram', 'madhyamgram', 
             'madurai', 'mahbubnagar', 'mahesana', 'maheshtala', 'mainpuri', 'malegaon', 'malerkotla', 
             'mandoli', 'mandsaur', 'mandya', 'mangalore', 'mango', 'mathura', 'maunath bhanjan', 
             'medinipur', 'meerut', 'mira bhayander', 'miryalaguda', 'mirzapur-cum-vindhyachal', 'modinagar',
              'moga', 'moradabad', 'morena', 'morvi', 'motihari', 'mughalsarai', 'muktsar', 'munger', 'murwara',
               'mustafabad', 'muzaffarnagar', 'muzaffarpur', 'mysore', 'nabadwip', 'nadiad', 'nagaon', 'nagapattinam',
                'nagaur', 'nagda', 'nagercoil', 'nagpur', 'naihati', 'nalgonda', 'nanded waghala', 'nandurbar',
                 'nandyal', 'nangloi jat', 'narasaraopet', 'nashik', 'navi mumbai', 'navi mumbai panvel raigarh',
                  'navsari', 'neemuch', 'nellore', 'new delhi', 'neyveli', 'nizamabad', 'noida', 'north barrackpur',
                   'north dum dum', 'ongole', 'orai', 'osmanabad', 'ozhukarai', 'palakkad', 'palanpur', 'pali',
             'pallavaram', 'palwal', 'panchkula', 'panihati', 'panipat', 'panvel', 'parbhani', 'patan', 
             'pathankot', 'patiala', 'patna', 'pilibhit', 'pimpri chinchwad', 'pithampur', 'porbandar',
              'port blair', 'proddatur', 'puducherry', 'pudukkottai', 'pune', 'puri', 'purnia', 'puruliya', 
              'rae bareli', 'raichur', 'raiganj', 'raigarh', 'raipur', 'rajahmundry', 'rajapalayam', 
              'rajarhat gopalpur', 'rajkot', 'rajnandgaon', 'rajpur sonarpur', 'ramagundam', 'rampur', 'ranchi',
               'ranibennur', 'raniganj', 'ratlam', 'raurkela industrial township', 'raurkela town', 'rewa',
                'rewari', 'rishra', 'robertson pet', 'rohtak', 'roorkee', 'rudrapur', 's.a.s. nagar', 'sagar',
                 'saharanpur', 'saharsa', 'salem', 'sambalpur', 'sambhal', 'sangli miraj kupwad', 'santipur',
                 'sasaram', 'satara', 'satna', 'sawai madhopur', 'secunderabad', 'sehore', 'seoni', 'serampore', 
                 'shahjahanpur', 'shamli', 'shikohabad', 'shillong', 'shimla', 'shimoga', 'shivpuri', 'sikar', 
                 'silchar', 'siliguri', 'singrauli', 'sirsa', 'sitapur', 'siwan', 'solapur', 'sonipat',
                  'south dum dum', 'srikakulam', 'srinagar', 'sujangarh', 'sultan pur majra', 'sultanpur', 
                  'surat', 'surendranagar dudhrej', 'suryapet', 'tadepalligudem', 'tadpatri', 'tambaram',
                   'tenali', 'thane', 'thanesar', 'thanjavur', 'thiruvananthapuram', 'thoothukkudi', 'thrissur',
                    'tiruchirappalli', 'tirunelveli', 'tirupati', 'tiruppur', 'tiruvannamalai', 'tiruvottiyur',
                     'titagarh', 'tonk', 'tumkur', 'udaipur', 'udgir', 'udupi', 'ujjain', 'ulhasnagar', 'uluberia', 'unnao', 'uttarpara kotrung', 'vadodara', 'valsad', 'varanasi', 'vasai virar city', 'vellore', 'veraval', 'vidisha', 'vijayawada', 
    'visakhapatnam', 'vizianagaram', 'warangal', 'wardha', 'yamunanagar', 'yavatmal']
    if (!name || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !profession || !gender) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    }
    try {
        const userExist = await Professional.findOne({ email: email });
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (userExist) {
            return res.status(444).json({ error: "Email already exist" });
        }
        else if (!validRegex.test(email)) {
            return res.status(466).json({ error: "Invalid email" });
        }
         else if ((phoneNo.length != 10)|| (isNaN(phoneNo))) {
            return res.status(455).json({ error: "Invalid Phone number" });

        }
        else if (password != cpassword) {
            return res.status(433).json({ error: "password are not matching" });
        } 
        else if (!states.includes(state.toLowerCase())) {
            return res.status(477).json({ error: "state entered is invalid" });
        }
        else if (!cities.includes(city.toLowerCase())) {
            return res.status(488).json({ error: "city entered is invalid or the services are not currently present in your city" });
        }
        else {
            const user = new Professional({ name, email, phoneNo, password, cpassword, address, city, state, profession, gender });
            const professionalRegister = await user.save();
            res.status(201).json({ message: "User added successfully in the database" });
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/confirm', async (req, res) => {

    try {
        const { customer, professional } = req.body.putData
        // console.log(customer)
        const transaction = new Transaction({ customer, professional })
        const transactionRegister = await transaction.save();
        res.status(201).json({ message: "Transaction added successfully in the database" });
    }
    catch (err) {
        console.log(err)
    }
})
// Login route

router.post('/login-signup', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"cool"});
    try {
        let token
        var { email, password } = req.body;
        email = email.toLowerCase()

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        if (email == "admin" && password == "admin") {

            res.status(250).json({ message: "admin loged in successfully", user: "admin" })
            console.log(res)

            return res
        }
        let userLogin = await Customer.findOne({ email: email });
        // console.log(userLogin)
        // let isMatch = await bcrypt.compare(password, userLogin.password);
        if (!userLogin) {
            let userLogin = await Professional.findOne({ email: email });
            // let isMatch = await bcrypt.compare(password, userLogin.password);

            if (!userLogin) {
                res.status(400).json({ error: "Invalid user credentials" });
            } else {
                let isMatch = await bcrypt.compare(password, userLogin.password);
                token = await userLogin.generateProAuthToken();
                res.cookie("jwtProToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                if (!isMatch) {
                    res.status(400).json({ error: "Invalid user credentials" });

                } else {
                    res.status(251).json({ message: "professional loged in successfully" });
                }


            }
        }
        else {
            let isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateCusAuthToken();
            // console.log(token)
            res.cookie("jwtCusToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!isMatch) {
                res.status(400).json({ error: "Invalid user credentials" });

            } else {
                res.json({ message: "customer loged in successfully" });
            }
        }



    } catch (error) {
        console.log(error);
    }
})
router.post('/rating', async(req, res) => {
    var { email, rating } = req.body;
    // console.log(rating);
    const userRating = await Professional.findOne({ "email": email });
        if (userRating) {
            const userMessage = await userRating.addRating(rating);
            await userRating.save();
            res.status(201).json({ message: "user rating added" })
        }

});

router.get('/home', authenticate, (req, res) => {
    res.send(req.rootUser);
});
router.get('/profile', authenticate, (req, res) => {
    res.send(req.rootUser);
});
router.get('/reviews', authenticate, async (req, res) => {
    // res.send(req.rootUser);
    const data = await Transaction.find({ "customer.email": req.rootUser.email })
    res.send(data)
});
router.post('/reviews', async (req, res) => {
    // res.send(req.rootUser);
    const reviewText = req.body.reviewText
    // console.log(req.body.cus_email);
    const userReview = await Transaction.findOne({ "professional.email": req.body.pro_email, "professional.tier_name": req.body.tier_name ,"customer.email":req.body.cus_email});
    // console.log(userReview);
    console.log(req.body);

    if (userReview) {
        const userReviewSent = await userReview.addReview(reviewText);
        await userReview.save();
        res.status(201).json({ message: "user pro message added" })

    }

    const userPro = await Professional.findOne({ "email": req.body.pro_email });
    if (userPro) {
        // console.log(reviewText);
        const userProSent = await userPro.addReviews(userReview.customer.name, userReview.customer.email, userReview.customer.phoneNo, reviewText, userReview.professional.tier_name);
        // console.log(userPro);
        // console.log(reviewText);
        await userPro.save();
        // res.status(201).json({message:"user pro message added"})


    }


});
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            console.log(("error in contact form"));
            return res.json({ error: "please fill the contact form " });
        }
        const userContact = await Customer.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);
            await userContact.save();
            res.status(201).json({ message: "user message added" })

        }
    } catch (e) {
        console.log(e);
    }
});
router.post('/pro', authenticatePro, async (req, res) => {
    try {
        const { tier1_name, tier1_price, tier1_details, tier2_name, tier2_price, tier2_details, tier3_name, tier3_price, tier3_details } = req.body;
        if (!tier1_name || !tier1_price || !tier1_details || !tier2_name || !tier2_price || !tier2_details || !tier3_name || !tier3_price || !tier3_details) {
            console.log("error in professional tiers form")
            return res.json({ error: "please fill the contact form " });
        }
        const userTiers = await Professional.findOne({ _id: req.userID });
        if (userTiers) {
            const userMessage = await userTiers.addTiers(tier1_name, tier1_price, tier1_details, tier2_name, tier2_price, tier2_details, tier3_name, tier3_price, tier3_details);
            await userTiers.save();
            res.status(201).json({ message: "user message added" })

        }


    } catch (error) {
        console.log(error);
    }
})
router.post('/pro-contact', authenticatePro, async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            console.log(("error in contact form"));
            return res.json({ error: "please fill the contact form " });
        }
        const userContact = await Professional.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);
            await userContact.save();
            res.status(201).json({ message: "user message added" })

        }
    } catch (e) {
        console.log(e);
    }
});
router.get('/pro-profile', authenticatePro, (req, res) => {
    res.send(req.rootUser);
});
router.get('/pro-contact', authenticatePro, (req, res) => {
    res.send(req.rootUser);
});
router.get('/contact', authenticate, (req, res) => {
    res.send(req.rootUser);
});
router.get('/confirm', authenticate, (req, res) => {
    res.send(req.rootUser);
});
// router.get('/search',authenticate,(req,res)=>{
//     res.send(req.rootUser);
// });
router.get('/about-pro', authenticate, (req, res) => {
    res.send(req.rootUser);
});
router.get('/pro', authenticatePro, (req, res) => {
    res.send(req.rootUser);
});

router.get('/log-out', (req, res) => {
    res.clearCookie('jwtCusToken')
    res.clearCookie('jwtProToken')

    res.status(200).send('user logout')
});
router.get('/admin/cusDetails', async (req, res) => {
    const data = await Customer.find();
    res.send(data);
})
router.get('/admin/proVerify', async (req, res) => {
    const data = await Professional.find();
    res.send(data);
})
router.get('/admin/cusReviews', async (req, res) => {
    const data = await Customer.find();
    res.send(data);
})
router.get('/admin/transactions', async (req, res) => {
    const data = await Transaction.find();
    res.send(data);
})
router.get('/search', async (req, res) => {
    const data = await Professional.find();
    res.send(data);
})
router.get('/pro/cusNotify', authenticatePro, async (req, res) => {
    // res.send(req.rootUser);
    const data = await Transaction.find({ "professional.email": req.rootUser.email })
    res.send(data)
});
router.get('/pro/cusReview', authenticatePro, async (req, res) => {
    res.send(req.rootUser);
    // const data = await Profes.find({"professional.email" : req.rootUser.email})

});

// router.post("/addFile", async(req,res)=>{
//     let form = new formidable.IncomingForm();
//     console.log(form);
//     form.keepExtension = true; //
//     form.parse(req, (err, fields, file) => {
//       if (err) {
//         res.status(400).json({ Error: "Lookup in the files,problem with image" });
//       }  
//     //   let product = new Professional.find();
//     //   //handle file here
//     //   //check size of
//       console.log(file);
//     //   if (file.file) {
//     //     if (file.file.size > 10 * 1024 * 1024) {
//     //       return res.status(400).json({
//     //         Error: "file size excceeded",
//     //         Solution: "https://smallpdf.com/compress-pdf",
//     //       });
//     //     }
//     //     if (file.file.type !== "application/pdf") {
//     //       return res.status(400).json({ Error: "Format must be pdf!" });
//     //     }
//     //     product.file.data = fs.readFileSync(file.file.path); //apne aap convert kr le rha hai
//     //     product.file.contentType = file.file.type;
//     //   }
//     //   //save in dB
//     //   var fileid, names, descriptions;
//     //   product.save(async (err, product) => {
//     //     if (err) {
//     //         console.log(err);
//     //       return res.status(400).json({ Error: "saving in DB" });
//     //     }
        
  
        
//     //     // res.redirect("https://codify-v1.herokuapp.com/getfiles");
//     //     res.json({
//     //       message: "UPLOADED",
//     //     });
//     //   });
//     });
// })

// router.get("/getFile",async(req,res)=>{
//     try {
//         console.log(req.body.id);
//         const pp = await Professional.findById(req.body.id);
//         console.log(pp);
//         if (!pp) {
//           res.status(400).json({
//             Error: "No file!",
//           });
//         }
//         if (pp.file.data) {
//           res.set("Content-type", pp.file.contentType);
    
//           res.send(pp.file.data);
//         }
//       } catch (e) {
//         res.status(400).json({
//           Error: "No file for this Id.",
//         });
//       }

// })


module.exports = router;