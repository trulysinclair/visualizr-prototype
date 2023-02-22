describe("Basic Flow Basics", () => {
  beforeEach(() => {
    cy.visit("https://visualizr.trulysinclair.dev/");
    cy.fixture("simpleflow.ts")
  });

  it("renders a grid", () => {
    cy.get(".react-flow__background");
  });

  it("drags a node", () => {
    const styleBeforeDrag = Cypress.$(".react-flow__node:first").css(
      "transform"
    );

    cy.drag(".react-flow__node:first", { x: 500, y: 25 }).then(($el: any) => {
      const styleAfterDrag = $el.css("transform");
      expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
    });
  });
});

export {};
