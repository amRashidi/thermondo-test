import { mount, VueWrapper } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader.vue";

/* #region  Test setup */
const factory = () =>
  mount(AppHeader, {
    props: { title: "test" },
  });
/* #endregion */

describe("AppHeader.vue", () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = factory();
  });

  it("should mount properly", () => {
    expect(wrapper).toBeTruthy();
  });
});
