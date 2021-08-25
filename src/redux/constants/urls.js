// account
export const loginUrl = 'account/login/';
export const playerUrl = ({ gameId }) => `game/${gameId}/player/`;


// game
export const subjectUrl = ({ gameId, subjectId }) =>
  subjectId
    ? `game/${gameId}/subject/${subjectId}/`
    : `game/${gameId}/subject/`;
export const playerProblemUrl = ({ gameId, problemId }) =>
  problemId
    ? `game/${gameId}/problem/${problemId}/`
    : `game/${gameId}/problem/`

export const answerCorrectionUrl = ({ gameId, AnswerId }) =>
  AnswerId
    ? `game/${gameId}/mentor/problem/${AnswerId}/`
    : `game/${gameId}/mentor/problem/`

export const addProblemUrl = ({ gameId }) => `game/${gameId}/mentor/problem/add/`;



// auction
export const auctionUrl = ({ gameId }) => `auction/${gameId}/`;
export const createAuctionUrl = 'auction/create/';
export const buyAuctionUrl = ({ gameId }) => `auction/${gameId}/buy/`;












export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ userId }) => userId ? `auth/accounts/${userId}/` : 'auth/accounts/';
export const profileCRUDUrl = ({ userId }) => userId ? `auth/profile/${userId}/` : 'auth/profile/';
export const studentshipCRUDUrl = ({ userId }) => userId ? `auth/studentship/${userId}/` : 'auth/studentship/';
export const discountCRUDUrl = ({ discountCodeId }) => discountCodeId ? `auth/discount_code/${discountCodeId}/` : 'auth/discount_code/';
export const merchandiseDiscountCodeUrl = ({ merchandiseId }) => `/auth/merchandise/${merchandiseId}/discount_codes/`;


// fsm:
export const eventInfoUrl = ({ eventId = undefined }) => eventId ? `fsm/event/${eventId}/` : 'fsm/event/';
export const allRegistrationReceiptsUrl = ({ registrationFormId = undefined }) => `fsm/registration/${registrationFormId}/receipts/`;
export const oneRegistrationReceiptUrl = ({ registrationReceiptId = undefined }) => `fsm/receipts/${registrationReceiptId}/`;
export const validateRegistrationReceiptUrl = ({ registrationReceiptId = undefined }) => `/fsm/receipts/${registrationReceiptId}/validate/`




export const workshopsUrl = 'fsm/fsm/';

export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';

export const articlesUrl = 'fsm/article/';

export const statesUrl = 'fsm/state/';

export const helpUrl = 'fsm/help/';

export const widgetUrl = 'fsm/widget/';

export const workshopTeamsUrl = 'fsm/workshopplayers/';

export const getLandingDataUrl = `https://res.cloudinary.com/dflcxtpro/raw/upload/v${Math.floor(
  Math.random() * 10000000
)}/rasta/landing-zero-v3_d5lbgq.json`;

export const goBackwardUrl = 'fsm/gobackward/';

export const goForwardUrl = 'fsm/goforward/';

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const mentorGetCurrentStateUrl = 'fsm/mentorgetplayerstate/';

export const visitWorkshopPlayerUrl = 'fsm/visitteam/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';

export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

export const getProblemsUrl = 'fsm/getproblems/';

export const getSubmissionsUrl = 'fsm/getsubmissions/';

export const markSubmissionUrl = 'fsm/marksubmission/';

export const getWorkshopsDescriptionUrl = 'fsm/getworkshopsdescription/';