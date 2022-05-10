describe("Login user", () => {
  it("Should input email", async () => {
    await device.launchApp();
    await device.reloadReactNative();
    const emailInput = element(by.id("email"));
    await emailInput.typeText("aaa@bbb.lt");
  });
  it("Should input password", async () => {
    const passwordInput = element(by.id("password"));
    await passwordInput.typeText("testas123");
  });
  it("Should login user", async () => {
    await element(by.id("button")).tap();
  });
});

describe("Start cognitive track", () => {
  it("Should open all tracks screen", async () => {
    await element(by.id("All routes")).tap();
  });
  it("Should open all tracks search screen", async () => {
    await element(by.id("search")).tap();
  });
  it("Should open first track inner", async () => {
    await element(by.id("track0")).tap();
  });
  it("Should press start button", async () => {
    await element(by.text("Start")).tap();
  });
  it("Should open cognitive track", async () => {
    await element(by.text("Cognitive")).tap();
  });
});

describe("Create new track", () => {
  it("Should open track creation screen", async () => {
    await device.reloadReactNative();
    await element(by.id("fab")).tap();
  });
  it("Should add track common data", async () => {
    const title = element(by.id("title"));
    await title.typeText("Testinis marsrutas");
    const description = element(by.id("description"));
    await description.typeText("Naujo marsruto ilgesnis aprasymas");
  });
  it("Should open new marker bottom sheet", async () => {
    await element(by.id("addMarker")).tap();
  });
  it("Should add new object", async () => {
    const mTitle = element(by.id("mTitle"));
    await mTitle.typeText("Naujas objektas");
    await element(by.id("map")).swipe("right");
    await element(by.id("save")).tap();
  });
  it("Should save new track", async () => {
    await element(by.id("create")).tap();
  });
});
