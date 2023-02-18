import { mount } from "@vue/test-utils";
import VCard from "@/components/kit/VCard.vue";

/* #region  Test setup */
const factory = (props = {}) =>
  mount(VCard, {
    props: {
      user: {
        title: "title",
        avatar: "avatar",
        address: "address",
        phone: "phone",
        email: "email",
        id: "id",
        ...props,
      },
    },
  });
/* #endregion */

describe("VCard.vue", () => {
  it("should mount properly", () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
  });
  it("should match snapshot", () => {
    const wrapper = factory();
    expect(wrapper).toMatchSnapshot();
  });
  it("should show no image", () => {
    const wrapper = factory({ avatar: "" });
    expect(wrapper.find("img").attributes("src")).toBe("/no-image.jpg");
  });
  it("emits return false if button is clicked", () => {
    const wrapper = factory();
    wrapper.find(".view-btn").trigger("click");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().view[0]).toEqual(["id"]);
    });
  });
  it("emits return false if button is clicked", () => {
    const wrapper = factory();
    wrapper.find(".remove-btn").trigger("click");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().remove[0]).toEqual(["id"]);
    });
  });
});
