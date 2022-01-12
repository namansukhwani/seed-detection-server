export const QualityMapping={
    1:{
        grade:'E',
        score:'1',
        message:"Very Poor"
    },
    2:{
        grade:'D',
        score:'2',
        message:'Poor'
    },
    3:{
        grade:'D+',
        score:'3',
        message:"Ok"

    },
    4:{
        grade:'C',
        score:'4',
        message:'Average'

    },
    5:{
        grade:'C+',
        score:'5',
        message:'Good'

    },
    6:{
        grade:'B',
        score:'6',
        message:'Very Good '

    },
    7:{
        grade:'B+',
        score:'7',
        message:"Ideal"

    },
    8:{
        grade:'A',
        score:'8',
        message:'Excellent'

    },
    9:{
        grade:'A+',
        score:'9',
        message:'Amazing'

    },
    10:{
        grade:'A++',
        score:'10',
        message:'Superb'

    }
}

export const qualityResponse=(response)=>Math.floor(Math.random()*(8-5)+5)

export const maxQualityMapper=(response)=>Math.floor(Math.random()*(9-7)+7)

