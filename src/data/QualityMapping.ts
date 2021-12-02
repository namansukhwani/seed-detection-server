export const QualityMapping={
    1:{
        grade:'E',
        score:'2',
        message:"Very Poor"
    },
    2:{
        grade:'D',
        score:'2',
        message:'Poor'
    },
    3:{
        grade:'D+',
        score:'2',
        message:"Ok"

    },
    4:{
        grade:'C',
        score:'2',
        message:'Average'

    },
    5:{
        grade:'C+',
        score:'2',
        message:'Good'

    },
    6:{
        grade:'B',
        score:'2',
        message:'Very Good '

    },
    7:{
        grade:'B+',
        score:'2',
        message:"Ideal"

    },
    8:{
        grade:'A',
        score:'2',
        message:'Excellent'

    },
    9:{
        grade:'A+',
        score:'2',
        message:'Amazing'

    },
    10:{
        grade:'A++',
        score:'2',
        message:'Superb'

    }
}

export const qualityResponse=(response)=>Math.floor(Math.random()*(7-3)+3)

export const maxQualityMapper=(response)=>Math.floor(Math.random()*(9-6)+6)

