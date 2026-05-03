const doctors = [
  {
    id:"doc001",name:"Dr. Priya Sharma",specialty:"General Physician",
    specialties:["fever","cold","flu","headache","fatigue","body pain","weakness","cough","throat","general","common cold","runny nose","chills","temperature","sore throat","tiredness"],
    qualification:"MBBS, MD (Internal Medicine)",experience:12,rating:4.9,reviews:312,fee:800,
    image:"👩‍⚕️",initials:"PS",color:"#10b981",
    hospital:"Apollo Clinic, Indiranagar, Bengaluru",
    languages:["English","Hindi","Kannada"],
    about:"Dr. Priya Sharma is a highly experienced General Physician with 12 years of practice. She specializes in fever management, chronic illness, and preventive care.",
    slots:{today:["09:00 AM","09:30 AM","11:00 AM","02:00 PM","04:30 PM"],tomorrow:["10:00 AM","11:30 AM","03:00 PM","05:00 PM"],dayafter:["09:30 AM","01:00 PM","03:30 PM"]}
  },
  {
    id:"doc002",name:"Dr. Arjun Mehta",specialty:"Cardiologist",
    specialties:["chest pain","heart","palpitation","breathlessness","blood pressure","hypertension","cardiac","shortness of breath","dizziness","fainting"],
    qualification:"MBBS, MD, DM (Cardiology)",experience:18,rating:4.8,reviews:527,fee:1500,
    image:"👨‍⚕️",initials:"AM",color:"#ef4444",
    hospital:"Manipal Hospital, Whitefield, Bengaluru",
    languages:["English","Hindi","Gujarati"],
    about:"Dr. Arjun Mehta is a leading Cardiologist with 18 years in interventional cardiology, ECG analysis, and managing complex heart diseases.",
    slots:{today:["10:00 AM","12:00 PM","03:00 PM"],tomorrow:["09:00 AM","11:00 AM","04:00 PM"],dayafter:["10:30 AM","02:00 PM","05:30 PM"]}
  },
  {
    id:"doc003",name:"Dr. Kavitha Nair",specialty:"Dermatologist",
    specialties:["skin","rash","acne","eczema","psoriasis","hair loss","itching","allergy","hives","dermatitis","spots","pimples","skin rash"],
    qualification:"MBBS, MD (Dermatology)",experience:9,rating:4.7,reviews:289,fee:1000,
    image:"👩‍⚕️",initials:"KN",color:"#f59e0b",
    hospital:"Fortis Hospital, Bannerghatta Road, Bengaluru",
    languages:["English","Malayalam","Kannada"],
    about:"Dr. Kavitha Nair specializes in cosmetic dermatology, acne treatment, hair restoration, and complex skin conditions with 9 years of expertise.",
    slots:{today:["11:00 AM","02:30 PM","05:00 PM"],tomorrow:["09:30 AM","12:00 PM","03:30 PM"],dayafter:["10:00 AM","01:30 PM","04:00 PM"]}
  },
  {
    id:"doc004",name:"Dr. Suresh Rajan",specialty:"Orthopedic Surgeon",
    specialties:["joint pain","knee pain","back pain","spine","fracture","bone","arthritis","muscle","shoulder pain","neck pain","sciatica","slip disc"],
    qualification:"MBBS, MS (Orthopedics)",experience:15,rating:4.8,reviews:401,fee:1200,
    image:"👨‍⚕️",initials:"SR",color:"#3b82f6",
    hospital:"Narayana Health, Electronic City, Bengaluru",
    languages:["English","Tamil","Kannada"],
    about:"Dr. Suresh Rajan is a specialist in joint replacement surgery, sports injuries, and spine disorders with 15 years of practice.",
    slots:{today:["09:00 AM","01:00 PM","04:00 PM"],tomorrow:["10:30 AM","02:30 PM","05:00 PM"],dayafter:["09:00 AM","11:30 AM","03:00 PM"]}
  },
  {
    id:"doc005",name:"Dr. Anjali Desai",specialty:"Neurologist",
    specialties:["migraine","headache","seizure","epilepsy","vertigo","numbness","tremor","memory","stroke","nerve","tingling","blackout","severe headache"],
    qualification:"MBBS, MD, DM (Neurology)",experience:14,rating:4.9,reviews:356,fee:1800,
    image:"👩‍⚕️",initials:"AD",color:"#8b5cf6",
    hospital:"NIMHANS, Hosur Road, Bengaluru",
    languages:["English","Hindi","Marathi"],
    about:"Dr. Anjali Desai is a distinguished Neurologist specializing in epilepsy, migraine treatment, stroke rehabilitation, and movement disorders.",
    slots:{today:["10:00 AM","03:00 PM"],tomorrow:["09:00 AM","12:30 PM","04:30 PM"],dayafter:["11:00 AM","02:30 PM","05:00 PM"]}
  },
  {
    id:"doc006",name:"Dr. Vikram Patel",specialty:"Gastroenterologist",
    specialties:["stomach","abdomen pain","bloating","gas","acidity","vomiting","nausea","diarrhea","constipation","liver","digestive","ibs","ulcer","heartburn"],
    qualification:"MBBS, MD, DM (Gastroenterology)",experience:11,rating:4.7,reviews:278,fee:1300,
    image:"👨‍⚕️",initials:"VP",color:"#06b6d4",
    hospital:"BGS Gleneagles Global Hospital, Bengaluru",
    languages:["English","Hindi","Gujarati"],
    about:"Dr. Vikram Patel is an expert Gastroenterologist with expertise in endoscopy, colonoscopy, liver disorders, and inflammatory bowel disease.",
    slots:{today:["11:30 AM","02:00 PM","04:30 PM"],tomorrow:["09:30 AM","01:00 PM","05:00 PM"],dayafter:["10:00 AM","02:30 PM","04:00 PM"]}
  },
  {
    id:"doc007",name:"Dr. Meena Krishnan",specialty:"Pulmonologist",
    specialties:["cough","asthma","wheezing","respiratory","lung","bronchitis","pneumonia","breathing difficulty","copd","phlegm","breathless"],
    qualification:"MBBS, MD (Pulmonology)",experience:10,rating:4.6,reviews:198,fee:1100,
    image:"👩‍⚕️",initials:"MK",color:"#ec4899",
    hospital:"Columbia Asia Hospital, Hebbal, Bengaluru",
    languages:["English","Tamil","Kannada"],
    about:"Dr. Meena Krishnan specializes in respiratory disorders, asthma management, sleep apnea, and critical care pulmonology.",
    slots:{today:["09:30 AM","12:00 PM","03:30 PM"],tomorrow:["10:00 AM","02:00 PM","05:30 PM"],dayafter:["09:00 AM","12:30 PM","04:30 PM"]}
  },
  {
    id:"doc008",name:"Dr. Rahul Verma",specialty:"Psychiatrist",
    specialties:["anxiety","depression","stress","mental","insomnia","sleep","mood","panic","ocd","phobia","mental health","sadness","hopeless","nervous"],
    qualification:"MBBS, MD (Psychiatry)",experience:13,rating:4.9,reviews:445,fee:1600,
    image:"👨‍⚕️",initials:"RV",color:"#f97316",
    hospital:"Vandrevala Foundation, MG Road, Bengaluru",
    languages:["English","Hindi"],
    about:"Dr. Rahul Verma is a compassionate Psychiatrist specializing in anxiety disorders, depression, trauma therapy, and cognitive behavioral therapy.",
    slots:{today:["10:30 AM","01:00 PM","04:00 PM"],tomorrow:["09:00 AM","11:30 AM","03:30 PM"],dayafter:["10:00 AM","01:30 PM","05:00 PM"]}
  },
  {
    id:"doc002",name:"Dr. Shivani Rajput",specialty:"Cardiologist",
    specialties:["chest pain","heart","palpitation","breathlessness","blood pressure","hypertension","cardiac","shortness of breath","dizziness","fainting"],
    qualification:"MBBS, MD, DM (Cardiology)",experience:7,rating:4.1,reviews:203,fee:1100,
    image:"👩‍⚕️",initials:"AM",color:"#ef4444",
    hospital:"Apollo Hospital, Marathalli, Bengaluru",
    languages:["Hindi","Kannada"],
    about:"Dr. Shivani Rajput is a leading Cardiologist with 7 years in interventional cardiology, ECG analysis, and managing complex heart diseases.",
    slots:{today:["11:00 AM","02:00 PM","07:00 PM"],tomorrow:["07:00 AM","10:30 AM","08:00 PM"],dayafter:["11:30 AM","01:00 PM","03:30 PM"]}
  }
];

const symptomKeywords={
  cardiology:['chest pain','heart','palpitation','breathless','shortness of breath','blood pressure','hypertension','cardiac','dizziness','fainting'],
  dermatology:['skin','rash','acne','eczema','psoriasis','hair loss','itching','allergy','hives','dermatitis','spots','pimples'],
  orthopedics:['joint pain','knee pain','back pain','spine','fracture','bone','arthritis','muscle','shoulder pain','neck pain','sciatica','slip disc'],
  neurology:['migraine','seizure','epilepsy','vertigo','numbness','tremor','memory','stroke','nerve','tingling','blackout','severe headache'],
  gastroenterology:['stomach pain','abdomen','bloating','gas','acidity','vomiting','nausea','diarrhea','constipation','liver','ibs','ulcer','heartburn'],
  pulmonology:['cough','asthma','wheezing','respiratory','lung','bronchitis','pneumonia','breathing difficulty','copd','phlegm'],
  psychiatry:['anxiety','depression','stress','mental','insomnia','sleep problem','mood swings','panic attack','ocd','phobia','sadness','hopeless','nervous'],
  general:['fever','cold','flu','fatigue','weakness','body pain','throat','common cold','runny nose','chills','temperature','sore throat','tiredness']
};

const specialtyToDoc={cardiology:'doc002',dermatology:'doc003',orthopedics:'doc004',neurology:'doc005',gastroenterology:'doc006',pulmonology:'doc007',psychiatry:'doc008',general:'doc001'};

function analyzeSymptoms(text){
  const t=text.toLowerCase();
  const scores={};const detected=[];
  for(const[spec,kws]of Object.entries(symptomKeywords)){
    scores[spec]=0;
    for(const kw of kws){if(t.includes(kw)){scores[spec]+=kw.split(' ').length>1?3:1;detected.push(kw);}}
  }
  const sorted=Object.entries(scores).filter(([,s])=>s>0).sort((a,b)=>b[1]-a[1]);
  if(!sorted.length)sorted.push(['general',1]);
  const top=sorted.slice(0,3);
  const matched=new Set();const recDocs=[];
  for(const[spec]of top){const id=specialtyToDoc[spec];if(id&&!matched.has(id)){matched.add(id);const d=doctors.find(x=>x.id===id);if(d)recDocs.push(d);}}
  for(const d of doctors){if(!matched.has(d.id)){const m=d.specialties.filter(s=>t.includes(s));if(m.length){matched.add(d.id);recDocs.push(d);}}}
  const urgentKws=['severe','extreme','unbearable','emergency','chest pain','stroke','seizure','unconscious',"can't breathe"];
  const isUrgent=urgentKws.some(k=>t.includes(k));
  const reasoning=[];
  if(detected.length)reasoning.push(`Detected ${[...new Set(detected)].length} symptom indicators: ${[...new Set(detected)].slice(0,4).join(', ')}`);
  top.forEach(([s])=>{const m={cardiology:'Cardiac symptoms detected — Cardiologist evaluation strongly recommended',dermatology:'Skin-related symptoms identified — Dermatologist consultation advised',orthopedics:'Musculoskeletal symptoms found — Orthopedic specialist recommended',neurology:'Neurological indicators present — Neurologist assessment critical',gastroenterology:'GI symptoms detected — Gastroenterologist recommended',pulmonology:'Respiratory symptoms found — Pulmonologist consultation advised',psychiatry:'Mental health indicators noted — Psychiatrist consultation recommended',general:'General health symptoms — General Physician for initial assessment'};if(m[s])reasoning.push(m[s]);});
  return{detectedSymptoms:[...new Set(detected)],recommendedSpecialties:top.map(([s])=>s),recommendedDoctors:recDocs.slice(0,4),reasoning,urgencyLevel:isUrgent?'HIGH':sorted[0]?.[1]>=3?'MEDIUM':'LOW',confidence:Math.min(97,55+(detected.length*9))};
}

function getDoctorById(id){return doctors.find(d=>d.id===id)||null;}

module.exports={doctors,analyzeSymptoms,getDoctorById};
