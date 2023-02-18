import { mount, VueWrapper } from "@vue/test-utils";
import VBtn from "@/components/kit/VBtn.vue";

/* #region  Test setup */
const factory = (props = {}) =>
  mount(VBtn, {
    props: { ...props },
    slots: { default: () => 'TEST' },
  });
/* #endregion */

describe("VBtn.vue", () => {
  it("should mount properly", () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe('TEST')
  });
  it("should be link", () => {
    const wrapper = factory({ router: true, to: "TEST" });
    expect(wrapper).toMatchSnapshot('TEST')
    expect(wrapper.find("a")).toBeTruthy()
    expect(wrapper.attributes("role")).toBe("link");
    expect(wrapper.attributes("href")).toBe("TEST");
  });
  it("should be has outline class", () => {
    const wrapper = factory({ outline: true });
    expect(wrapper.classes("v-btn--outlined")).toBe(true);
  });
  it("should be has text class", () => {
    const wrapper = factory({ text: true });
    expect(wrapper.classes("v-btn--text")).toBe(true);
  });
  it("should be has primary class", () => {
    const wrapper = factory({ color: "primary" });
    expect(wrapper.classes("v-btn--primary")).toBe(true);
  });
  it("should be disabled", () => {
    const wrapper = factory({ disabled: true });
    expect(wrapper.attributes("disabled")).toBe("");
  });
});
