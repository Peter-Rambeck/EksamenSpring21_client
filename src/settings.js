const USER_BASE = "https://www.peterrambeckandersen.com/tomcat/dog-walker/api";
const INFO_BASE = "https://www.peterrambeckandersen.com/tomcat/dog-walker/api";

const USER = {
  LOGIN: `${USER_BASE}/login`,
};

const INFO = {
  USER: `${INFO_BASE}/user`,
  ADMIN: `${INFO_BASE}/admin`,
  FETCH_MANY: `${INFO_BASE}/fetchMany`,
  FETCH_ONE: `${INFO_BASE}/fetchData`,
};

export { USER, INFO };
