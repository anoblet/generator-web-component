var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "tag",
        message: "Tag"
      }
    ]);
    const parts = this.answers.tag
      .split("-")
      .map(string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      })
      .join("");
    this.answers.className = parts;
  }

  async initializingApp() {
    this.composeWith(require.resolve("generator-npm-init/app"), {
      "skip-name": false,
      "skip-description": false,
      "skip-version": false,
      "skip-main": true,
      "skip-test": true,
      "skip-repo": false,
      "skip-keywords": false,
      "skip-author": false,
      "skip-license": false,
      name: this.answers.tag,
      main: `dist/${this.answers.tag}.js`,
      scripts: {
        build: "rollup --config",
        save: 'git add . && git commit -m "Chore: Save"',
        watch: "rollup --config -w"
      }
    });
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath("rollup.config.js"),
      this.destinationPath("rollup.config.js"),
      { className: this.answers.className, tag: this.answers.tag }
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copyTpl(
      this.templatePath("src/component.ts"),
      this.destinationPath("src/component.ts"),
      { className: this.answers.className, tag: this.answers.tag }
    );
    this.fs.copyTpl(
      this.templatePath("src/template.ts"),
      this.destinationPath("src/template.ts")
    );
    this.fs.copyTpl(
      this.templatePath("src/style.ts"),
      this.destinationPath("src/style.ts")
    );
  }

  async installing() {
    this.npmInstall(["lit-element"]);
    this.npmInstall(
      ["rollup", "rollup-plugin-typescript2", "tslib", "typescript"],
      {
        "save-dev": true
      }
    );
  }
};
