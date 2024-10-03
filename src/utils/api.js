// const API_URL = 'http://localhost:1200/api/v1';
// const API_URL = 'https://apply-oqvest-api.vercel.app';
const API_URL = 'https://api.oqteq.com/api/v1';

export const signup = `${API_URL}/user/register`;
export const forgetPassword = `${API_URL}/user/forgot-password`;
export const resetPassword = `${API_URL}/user/reset-password`;
export const testSubmit = `${API_URL}/test/submit`;
export const updateClient = `${API_URL}/user`;

export const getLoan = (id)=> {
    return `${API_URL}/loan/${id}`;
};

export const getLoanApplicationData = (id)=> {
    return `${API_URL}/loan/application-data/${id}`;
};

export const getLoanByClientId = (clientid)=> {
    return `${API_URL}/loan/get/${clientid}`;
};
export const addLoan = `${API_URL}/loan/application`;
export const updateLoan = `${API_URL}/loan`;
export const addPersonalInfo = `${API_URL}/loan/personal-info`;
export const addProperty = `${API_URL}/loan/property`;
export const addRealtorInfo = `${API_URL}/loan/realtor-info`;
export const updateMartialStatus = `${API_URL}/loan/martial-status`;
export const addBorrowers = `${API_URL}/loan/borrowers`;
export const addAddress = `${API_URL}/loan/address`;
export const addDeclarations = `${API_URL}/loan/declaration`;
export const addRealEstate = `${API_URL}/loan/real-estate`;
export const addLoanVerification = `${API_URL}/loan/loan-verification`;
export const addEmployments = `${API_URL}/loan/employment`;
export const addMonthlyIncomes = `${API_URL}/loan/monthly-income`;
export const addAssets = `${API_URL}/loan/assets`;
export const addLiabilities = `${API_URL}/loan/liabilities`;
export const addGiftsGrants = `${API_URL}/loan/gifts-grants`;

export const deleteBorrowers = (borrowerId, loan_id)=> {
    return `${API_URL}/loan/borrowers/${borrowerId}/${loan_id}`;
};
export const deleteEmployment = (id)=> {
    return `${API_URL}/loan/employment/${id}`;
};
export const deleteMonthlyIncome = (id)=> {
    return `${API_URL}/loan/monthly-income/${id}`;
};
export const deleteAssets = (id)=> {
    return `${API_URL}/loan/assets/${id}`;
};
export const deleteLiabilities = (id)=> {
    return `${API_URL}/loan/liabilities/${id}`;
};
export const deleteGifts = (id)=> {
    return `${API_URL}/loan/gifts-grants/${id}`;
};
export const deleteAddress = (id)=> {
    return `${API_URL}/loan/address/${id}`;
};
export const deleteRealEstate = (id)=> {
    return `${API_URL}/loan/real-estate/${id}`;
};

export const getBorrowers = (borrowerId)=> {
    return `${API_URL}/loan/borrowers/${borrowerId}`;
};
export const getApplication = (id)=> {
    return `${API_URL}/loan/${id}`;
};
export const getPersonalInfo = (id)=> {
    return `${API_URL}/loan/personal-info/${id}`;
};
export const getProperty = (id)=> {
    return `${API_URL}/loan/property/${id}`;
};
export const getEmployment = (id)=> {
    return `${API_URL}/loan/employment/${id}`;
};
export const getMonthlyIncome = (id)=> {
    return `${API_URL}/loan/monthly-income/${id}`;
};
export const getAssets = (id)=> {
    return `${API_URL}/loan/assets/${id}`;
};
export const getLiabilities = (id)=> {
    return `${API_URL}/loan/liabilities/${id}`;
};
export const getGifts = (id)=> {
    return `${API_URL}/loan/gifts-grants/${id}`;
};
export const getAddress = (id, type)=> {
    return `${API_URL}/loan/address/${id}?type=${type}`;
};
export const getRealEstate = (id)=> {
    return `${API_URL}/loan/real-estate/${id}`;
};
export const getDeclaration = (id)=> {
    return `${API_URL}/loan/declaration/${id}`;
};
export const getRealtor = (id)=> {
    return `${API_URL}/loan/realtor-info/${id}`;
};

export const updatePersonalInfo = `${API_URL}/loan/personal-info`;
export const updateAddress = `${API_URL}/loan/address`;
export const updateProperty = `${API_URL}/loan/property`;
export const updateCoBorrower = `${API_URL}/loan/borrowers`;
export const updateEmployment = `${API_URL}/loan/employment`;
export const updateMonthlyIncome = `${API_URL}/loan/monthly-income`;
export const updateAssets = `${API_URL}/loan/assets`;
export const updateLiabilities = `${API_URL}/loan/liabilities`;
export const updateGifts = `${API_URL}/loan/gifts-grants`;
export const updateRealEstate = `${API_URL}/loan/real-estate`;
export const updateRealtor = `${API_URL}/loan/realtor-info`;
export const updateDeclaration = `${API_URL}/loan/declaration`;

export const getAddressSuggesitions = (address)=> {
    return `${API_URL}/address/suggesitions?address=${address}`;
};

export const getPreapprovalProgress = (clientid)=> {
    return `${API_URL}/preapproval/progress/details/${clientid}`;
};

// File upload

export const uploadDoc = `${API_URL}/doc/upload`;
export const createDoc = (loan_number, user_id)=> {
    return `${API_URL}/doc/create/${loan_number}/${user_id}`;
};
export const getDoc = (loan_number, user_id)=> {
    return `${API_URL}/doc/get/${loan_number}/${user_id}`;
};