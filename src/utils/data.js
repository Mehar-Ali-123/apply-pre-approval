export const declarationQuestions = [
  {
    key: 'primary_residence',
    letter: 'A',
    questionText: 'Will you occupy the property as your primary residence?',
    options: ['Yes', 'No'],
  },
  {
    key: 'ownership_last_three_years',
    letter: 'A.1',
    questionText: 'Have you had an ownership interest in another property in the last three years?',
    options: ['Yes', 'No'],
  },
  {
    key: 'purchase_transaction',
    letter: 'B',
    questionText: 'If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller or the property ?',
    options: ['Yes', 'No'],
  },
  {
    key: 'non_disclosed_money',
    letter: 'C',
    questionText: 'Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or obtaining any money from another party such as seller or realtor that you have not disclosed on this loan application ?',
    options: ['Yes', 'No'],
  },
  {
    key: 'non_disclosed_loan_on_property',
    letter: 'D.1',
    questionText: 'Have you or will you be applying for a mortgage loan on another property (not the property securing this loan) on or before closing of the transaction that is not disclosed on this loan application?',
    options: ['Yes', 'No'],
  },
  {
    key: 'non_disclosed_credit',
    letter: 'D.2',
    questionText: 'Have you or will you be applying for any new credit (e.g. installment loan, credit card etc.) on or before closing of this loan that is not disclosed on this application?',
    options: ['Yes', 'No'],
  },
  {
    key: 'property_subject_to_lien',
    letter: 'E',
    questionText: 'Will this property be subject to a lien that could take priority over first mortgage lien such as clean energy lien paid through your property taxes (e.g. the Property Assessed Clean Energy Program) ?',
    options: ['Yes', 'No'],
  },
];

export const financeQuestion = [
  {
    key: 'non_disclosed_debt_loan',
    letter: 'F',
    questionText: 'Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?',
    options: ['Yes', 'No'],
  },
  {
    key: 'outstanding_judgements',
    letter: 'G',
    questionText: 'Are there any outstanding judgements against you?',
    options: ['Yes', 'No'],
  },
  {
    key: 'federal_debt',
    letter: 'H',
    questionText: 'Are you presently delinquent or in defualt on any federal debt?',
    options: ['Yes', 'No'],
  },
  {
    key: 'personal_financial_liability',
    letter: 'I',
    questionText: 'Are you a party to a lawsuit in which you potentially have any personal financial liability?',
    options: ['Yes', 'No'],
  },
  {
    key: 'lieu_of_foreclosure',
    letter: 'J',
    questionText: 'Have you conveyed title to any property in lieu of foreclosure in the past 7 years?',
    options: ['Yes', 'No'],
  },
  {
    key: 'pre_foreclosure_sale',
    letter: 'K',
    questionText: 'Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby the property was sold to a third party and the Lender agreed to accept less than the outstanding mortgage balance due?',
    options: ['Yes', 'No'],
  },
  {
    key: 'property_foreclosed',
    letter: 'L',
    questionText: 'Have you had property foreclosed upon in the last 7 years?',
    options: ['Yes', 'No'],
  },
  {
    key: 'bankruptancy_declarancy',
    letter: 'M',
    questionText: 'Have you declared bankruptancy within the past 7 years?',
    options: ['Yes', 'No'],
  },
];

export const consumerInformationQuestions = [
  {
    key: 'homeownership_education_housing_counseling',
    questionText: 'Homeownership Education and Housing Counseling',
    options: ['Yes', 'No'],
  },
  {
    key: 'is_completed_homeownership_education',
    questionText: 'Has the Borrower(s) completed homeownership education (group or web-based classes) within the last 12 months?',
    options: ['Yes', 'No'],
  },
  {
    key: 'is_completed_housing_counseling',
    questionText: 'Has the Borrower(s) completed housing counseling (customized counselor-to-client services) within the last 12 months?',
    options: ['Yes', 'No'],
  }
]

export const otherQuestions = [
  {
    heading: 'Ethnicity',
    key: 'ethnicity',
    questionText: 'What is your ethnicity?',
    options: ['Hispanic or Latino', 'Puerto Rican', 'Mexican', 'Cuban', 'Other', 'I do not wish to provide this information'],
  },
  {
    heading: 'Gender',
    key: 'gender',
    questionText: 'What is your gender?',
    options: ['Female', 'Male', 'I do not wish to provide this information'],
  }
]

export const raceQuestion = {
  key: 'race',
  questionText: 'What is your race?',
  options: [
    {
      label: 'American Indian or Alaska Native',
      value: 'american'
    },
    {
      label: 'Asian',
      value: 'asian',
      subOptions: [
        { label: 'Asian Indian', value: 'asian-indian' },
        { label: 'Chinese', value: 'chinese' },
        { label: 'Filipino', value: 'filipino' },
        { label: 'Japanese', value: 'japanese' },
        { label: 'Korean', value: 'korean' },
        { label: 'Vietnamese', value: 'vietnamese' },
        { label: 'Other Asian Race', value: 'other-asian-race' },
      ],
    },
    {
      label: 'Black or African American',
      value: 'black',
    },
    {
      label: 'Native Hawaiian or Other Pacific Islander',
      value: 'hawaiian',
      subOptions: [
        { label: 'Native Hawaiian', value: 'native-hawaiian' },
        { label: 'Guamanian or Chamorro', value: 'guamanian_chamorro' },
        { label: 'Samoan', value: 'samoan' },
        { label: 'Other Pacific Islander', value: 'other-pacific-islander' },
      ],
    },
    {
      label: 'White',
      value: 'white',
    },
    {
      label: 'I do not wish to provide this information',
      value: 'no-info',
    },
  ],
};