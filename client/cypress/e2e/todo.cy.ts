function findTaskOnAnyPage(taskDescription) {
  function checkPage() {
    cy.get("table").then(($table) => {
      if ($table.text().includes(taskDescription)) {
        return;
      }
      cy.get('.MuiPagination-ul button[aria-label*="next" i]').then(($btn) => {
        if ($btn.length && !$btn.prop("disabled")) {
          cy.wrap($btn).click();
          checkPage();
        } else {
          throw new Error(`Task '${taskDescription}' not found in any page`);
        }
      });
    });
  }
  checkPage();
}

describe("Todo App Minimal E2E Flows", () => {
  const taskDescription = "Test Task E2E 123";
  const toDelete = "Task to Delete E2E 789";

  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new task and mark it as done", () => {
    cy.get('input[placeholder="Add your task"]').clear().type(taskDescription);
    cy.get('button[aria-label="Add Task"]').click();
    findTaskOnAnyPage(taskDescription);
    // Go to the page with the task and mark as done
    cy.get("table")
      .contains("td", taskDescription)
      .parents("tr")
      .within(() => {
        cy.get('button[title="Mark as done"]').click();
        cy.get("td")
          .first()
          .should("have.css", "text-decoration")
          .and("match", /line-through/);
      });
  });

  it("should add and then delete a task", () => {
    cy.get('input[placeholder="Add your task"]').clear().type(toDelete);
    cy.get('button[aria-label="Add Task"]').click();
    findTaskOnAnyPage(toDelete);
    cy.get("table")
      .contains("td", toDelete)
      .parents("tr")
      .within(() => {
        cy.get('button[title="Delete"]').click();
      });
    // Confirm it's gone (check all pages)
    function checkNotPresent() {
      cy.get("table").then(($table) => {
        if ($table.text().includes(toDelete)) {
          cy.get('.MuiPagination-ul button[aria-label*="next" i]').then(
            ($btn) => {
              if ($btn.length && !$btn.prop("disabled")) {
                cy.wrap($btn).click();
                checkNotPresent();
              } else {
                throw new Error(
                  `Task '${toDelete}' should not be present but was found`
                );
              }
            }
          );
        }
      });
    }
    checkNotPresent();
  });
});
