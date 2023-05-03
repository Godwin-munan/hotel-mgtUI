export enum AppRoles {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

export enum HttpStatus{
  HTTP_200_OK=200,
  HTTP_201_CREATED = 201,
  NOT_FOUND=400,
  UNAUTHORIZE=401,
  BAD_CREDENTIAL=404
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum AuthEndPoints{
  
  LOGIN = "/api/auth/login"
}

export enum GenderEndPoints {

  ADD_GENDER = "/api/gender/add",
  GET_GENDER = "/api/gender/get",
  GET_GENDER_ID = "/api/gender/get/",
  PUT_GENDER = "/api/gender/update",
  DELETE_GENDER = "/api/gender/delete/"

}

export enum RoleEndPoints {

  ADD_ROLE = "/api/role/add",
  GET_ROLE = "/api/role/get",
  GET_ROLE_ID = "/api/role/get/",
  PUT_ROLE = "/api/role/update",
  DELETE_ROLE = "/api/role/delete/"

}


export enum GuestEndPoints {

  ADD_GUEST = "/api/guest/add",
  ADD_ROOMLIST_GUEST_ID = "/api/guest/add/room/",
  GET_GUEST_PAGE = "/api/guest/get/",
  GET_GUEST_ID = "/api/guest/get/",
  GET_GUEST_COUNT = "/api/guest/get/currentCount",
  GET_GUEST_CURRENT = "/api/guest/get/current",
  PUT_GUEST = "/api/guest/update",
  DELETE_GUEST = "/api/guest/delete/",
  CHECKOUT_GUEST = "/api/guest/checkout"

}

export enum IdCardEndPoints {
  ADD_CID = "/api/card/add",
  GET_CID = "/api/card/get",
  GET_CID_ID = "/api/card/get/",
  PUT_CID = "/api/card/update",
  DELETE_CID = "/api/card/delete/"
}

export enum InvoiceEndPoints {
  ADD_INV = "/api/invoice/add",
  GET_INV_PAGE = "/api/invoice/get/",
  GET_INV_ID = "/api/invoice/get/",
  GET_INV_GUEST_ID = "/api/invoice/get/guest/",
  PUT_INV = "/api/invoice/update",
  DELETE_INV = "/api/invoice/delete/"
}

export enum JobEndPoints {
  ADD_JOB = "/api/job/add",
  GET_JOB = "/api/job/get",
  GET_JOB_ID = "/api/job/get/",
  PUT_JOB = "/api/job/update",
  DELETE_JOB = "/api/job/delete/"
}

export enum PayEndPoints {
  ADD_PAY = "/api/payment/add",
  ADD_PAY_INV_ID = "/api/payment/add/",
  GET_PAY_INV_CODE = "/api/payment/get/code/",
  GET_PAY_GUEST_CODE = "/api/payment/get/guestCode/",
  GET_PAY_GUEST_EMAIL = "/api/payment/get/guestEmail/",
  GET_PAY_INV_ID = "/api/payment/get/",
  PUT_PAY = "/api/payment/update",
  REMOVE_PAY = "/api/payment/remove/" 
}

export enum PayMethodEndPoints {
  ADD_METHOD = "/api/paymethod/add",
  GET_METHOD = "/api/paymethod/get",
  GET_METHOD_ID = "/api/paymethod/get/",
  PUT_METHOD = "/api/paymethod/update",
  DELETE_METHOD = "/api/paymethod/delete/"
}

export enum RoomEndPoints {
  ADD_RM = "/api/room/add",
  GET_RM_PAGE = "/api/room/get/",
  GET_RM_TYPE_ID = "/api/room/get/type/",
  GET_RM_ID = "/api/room/get/",
  GET_RM_AVL_COUNT = "/api/room/get/availableCount",
  GET_RM_OCC_COUNT = "/api/room/get/occupiedCount",
  GET_RM_TOTAL_COUNT = "/api/room/get/total",
  GET_RM_AVL_TYPE_ID = "/api/room/get/available/",
  PUT_RM = "/api/room/update",
  DELETE_RM = "/api/room/delete/"
}

export enum RoomTypeEndPoints {
  ADD_TYPE = "/api/roomtype/add",
  GET_TYPE = "/api/roomtype/get",
  GET_TYPE_ID = "/api/roomtype/get/",
  GET_TYPE_COUNT = "/api/roomtype/get/total",
  PUT_TYPE = "/api/roomtype/update",
  DELETE_TYPE = "/api/roomtype/delete/"
}

export enum ShiftEndPoints {
  ADD_SHIFT = "/api/shift/add",
  GET_SHIFT = "/api/shift/get",
  GET_SHIFT_ID = "/api/shift/get/",
  PUT_SHIFT = "/api/shift/update",
  DELETE_SHIFT = "/api/shift/delete/"
  
}


export enum StaffEndPoints {
  ADD_STAFF = "/api/staff/add",
  GET_STAFF_PAGE = "/api/staff/get/",
  GET_STAFF_ID = "/api/staff/get/",
  GET_STAFF_SHIFT_ID = "/api/staff/get/shift/",
  GET_STAFF_JOB_ID = "/api/staff/get/job/",
  PUT_STAFF = "/api/staff/update",
  DELETE_STAFF = "/api/staff/delete/"

}

export enum AppUserEndPoints {
  ADD_USER = "/api/user/add",
  ADD_ROLELIST_USER_ID = "/api/user/add/roles/",
  GET_USER = "/api/user/get",
  GET_USER_ID = "/api/user/get/",
  GET_USER_ROLE_ID = "/api/user/get/role/",
  PUT_USER = "/api/user/update",
  DELETE_USER = "/api/user/delete/",
  REMOVE_ROLE_USER_ID = "/api/user/remove/roles/"
}







