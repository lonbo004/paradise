import axiosProxy from './config';
import store from '@/store';
export function GetInfo() {
  let data = {
    SiteCode: store.state.SiteCode,
  }
  if (store.state.memberData)
    data.MemberCode = store.state.memberData.member_code;
  return axiosProxy({
    url: "/ParadiseApi/Api_GetInfo",
    method: "post",
    data
  })
}
export function Member_Login(account, password) {
  return axiosProxy({
    url: "/ParadiseApi/Api_Member_Login",
    method: "post",
    data: {
      account, password
    }
  })
}
export function Member_Create({ account, password, name }) {
  return axiosProxy({
    url: "/ParadiseApi/Api_Member_Create",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      account,
      password,
      name
    }
  })
}
//Lady
export function Lady_Firstpage_Search(town_code) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Firstpage_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      town_code
    }
  })
}
export function Lady_GetOne(ladycode) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_GetOne",
    method: "post",
    data: {
      sitecode: store.state.SiteCode,
      ladycode
    }
  })
}
export function Lady_Keywords_Search(keywords, page, page_range) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Keywords_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      keywords,
      page,
      page_range
    }
  })
}
export function Lady_Search({
  name,
  town_code,
  district_code,
  age,
  height,
  weight,
  country_code,
  price,
  environment_code,
  service_type_code,
  service_mode_code,
  cup_code,
  allow_service,
  page,
  page_range,
}) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      name: name || "",
      town_code: town_code || "",
      district_code: district_code || "",
      age: age || "",
      height: height || "",
      weight: weight || "",
      country_code: country_code || "",
      price: price || "",
      environment_code: environment_code || "",
      service_type_code: service_type_code || "",
      service_mode_code: service_mode_code || "",
      cup_code: cup_code || "",
      allow_service: allow_service || "",
      page: page || 0,
      page_range: page_range || 0,
    }
  })
}
export function Message_Create(cotents) {
  return axiosProxy({
    url: "/ParadiseApi/Api_Message_Create",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      member_code: store.state.memberData.member_code,
      member_name: store.state.memberData.name,
      lady_code: store.state.currentMe.code,
      lady_name: store.state.currentMe.name,
      cotents
    }
  })
}
export function Score_Create(face, attitude, body, skill) {
  return axiosProxy({
    url: "/ParadiseApi/Api_Score_Create",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      member_code: store.state.memberData.member_code,
      member_name: store.state.memberData.name,
      lady_code: store.state.currentMe.code,
      lady_name: store.state.currentMe.name,
      face,
      attitude,
      body,
      skill
    }
  })
}
export function Escort_Search(type, page, page_range) {
  return axiosProxy({
    url: "/ParadiseApi/Escort_Search",
    method: "post",
    data: {
      type, page, page_range
    }
  })
}