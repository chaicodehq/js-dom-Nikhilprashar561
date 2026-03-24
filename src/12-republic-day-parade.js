/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({  // First One
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({ // First One
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder(); // second One
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up"); // Third One
 *   // => true
 *
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military"); // Fourth One
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab"); // Fifth One.
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers(); //  Sixith One.
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment"); // Seventh One
 *   // => true
 */
export function createContingent(name, type, state, members) {
  if (
    typeof name !== "string" ||
    typeof type !== "string" ||
    typeof state !== "string"
  )
    return null;
  if (!Array.isArray(members)) return null;

  const div = document.createElement("div");
  div.classList.add("contingent");

  div.setAttribute("data-name", `${name}`);
  div.setAttribute("data-type", `${type}`);
  div.setAttribute("data-state", `${state}`);

  const h3 = document.createElement("h3");
  h3.textContent = `${name}`;

  const span = document.createElement("span");
  span.classList.add("type");
  span.textContent = `${type}`;

  const span2 = document.createElement("span");
  span2.classList.add("state");
  span2.textContent = `${state}`;

  const ul = document.createElement("ul");

  members.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = `${e}`;
    ul.appendChild(li);
  });

  div.appendChild(h3);
  div.appendChild(span);
  div.appendChild(span2);
  div.appendChild(ul);

  return div;
}

export function setupParadeDashboard(container) {
  if (container === null || container === undefined) return null;

  function addContingent(contingent) {
    const { name, type, state, members } = contingent;
    const element = createContingent(name, type, state, members);
    if (!element) return null;
    container.appendChild(element);
    return element;
  }

  function removeContingent(name) {
    const element = container.querySelector(`.contingent[data-name="${name}"]`);

    if (element) {
      element.remove();
      return true;
    }
    return false;
  }

  function moveContingent(name, direction) {
    if (!name || !direction) return false;

    const element = Array.from(container.children).find(
      (el) => el.dataset.name === name,
    );

    if (!element) return false;

    if (direction === "up") {
      const prev = element.previousElementSibling;
      if (!prev) return false;

      container.insertBefore(element, prev);
      return true;
    }

    if (direction === "down") {
      const next = element.nextElementSibling;
      if (!next) return false;

      container.insertBefore(next, element);
      return true;
    }

    return false;
  }

  function getContingentsByType(type) {
    const getIT = container.querySelectorAll(".contingent");

    const res = [];

    getIT.forEach((e) => {
      if (e.dataset.type === type) {
        res.push(e);
      }
    });

    return res;
  }

  function highlightState(state) {
    const gotIt = container.querySelectorAll(".contingent");

    let temp = 0;

    gotIt.forEach((element) => {
      if (element.dataset.state === state) {
        element.classList.add("highlight");
        temp++;
      } else {
        element.classList.remove("highlight");
      }
    });
    return temp;
  }

  function getParadeOrder() {
    const getIT = container.querySelectorAll(".contingent");
    const arr = Array.from(getIT);
    const mpp = arr.map((e) => e.dataset.name);
    return mpp;
  }

  function getTotalMembers() {
    return container.querySelectorAll(".contingent li").length;
  }

  return {
    addContingent,
    removeContingent,
    moveContingent,
    getContingentsByType,
    highlightState,
    getParadeOrder,
    getTotalMembers,
  };
}
