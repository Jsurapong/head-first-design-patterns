export {};

abstract class Page {
  render() {
    this.beforeRender();
    this.renderTitle();
    this.renderBody();
    this.afterRender();
    if (this.checkPermission()) {
      console.log("User login");
    }
  }

  abstract renderTitle(): void;
  abstract renderBody(): void;
  afterRender() {}
  beforeRender() {}
  checkPermission() {
    return false;
  }
}

class HomePage extends Page {
  renderTitle() {
    console.log("Home Page Title");
  }
  renderBody() {
    console.log("Home Page Body");
  }
  checkPermission() {
    return true;
  }
}

class ReportPage extends Page {
  renderTitle() {
    console.log("Report Page Title");
  }
  renderBody() {
    console.log("Report Page Body");
  }
  afterRender() {
    console.log("User login");
  }
  beforeRender() {
    console.log("check authorization");
  }
  checkPermission() {
    return true;
  }
}

function main() {
  let page = new HomePage();
  page.render();
  let reportPage = new ReportPage();
  reportPage.render();
}

main();
