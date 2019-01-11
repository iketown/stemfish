import faker from "faker";

export const fakeSong = {
  title: "My Heart Is Red",
  subTitle: "for you"
};

export const getFakeSong = () => {};

export const getFakePerson = () => {
  return {
    firstName: "first",
    lastName: "lasty",
    email: "email@me.org",
    avatarImg: faker.image.people()
  };
};
