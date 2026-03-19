/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (containerElement === null || containerElement === undefined) return null;

  function wrapeer() {
    containerElement.addEventListener("click", function (event) {
      const removeBtn = event.target.closest(".remove-btn");

      if (removeBtn) {
        const guest = removeBtn.closest(".guest-item");

        if (guest) {
          guest.remove();
        }
      }
    });

    function addGuest(name, side) {
      const div = document.createElement("div");
      div.classList.add("guest-item");

      div.setAttribute("data-name", `${name}`);
      div.setAttribute("data-side", `${side}`);

      const span = document.createElement("span");
      const btn = document.createElement("button");

      span.textContent = `${name}`;
      btn.classList.add("remove-btn");
      btn.textContent = `Remove`;

      div.appendChild(span);
      div.appendChild(btn);
      containerElement.appendChild(div);
      return div;
    }
    function removeGuest(name) {
      const getData = document.querySelector(
        `.guest-item[data-name="${name}"]`,
      );
      if (getData) {
        getData.remove();
        return true;
      } else if (!getData) {
        return false;
      }
    }
    function getGuests() {
      const res = [];
      const getAll = document.querySelectorAll(".guest-item");
      getAll.forEach((e) => {
        res.push({
          name: e.dataset.name,
          side: e.dataset.side,
        });
      });
      return res;
    }
    return {
      addGuest,
      removeGuest,
      getGuests,
    };
  }
  const detach = wrapeer();
  return detach;
}

export function setupThemeSelector(containerElement, previewElement) {
  if (containerElement === null || containerElement === undefined) return null;
  if (previewElement === null || previewElement === undefined) return null;

    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const button3 = document.createElement("button");

    button1.textContent = `traditional`;
    button2.textContent = `modern`;
    button3.textContent = `royal`;

    button1.classList.add(`theme-btn`);
    button2.classList.add(`theme-btn`);
    button3.classList.add(`theme-btn`);

    button1.setAttribute("data-theme", `traditional`);
    button2.setAttribute("data-theme", `modern`);
    button3.setAttribute("data-theme", `royal`);

    containerElement.appendChild(button1);
    containerElement.appendChild(button2);
    containerElement.appendChild(button3);

    containerElement.addEventListener("click", function (event) {
      const themeBtn = event.target.closest('.theme-btn')

      if(!themeBtn) return null;
      const selct = themeBtn.getAttribute('data-theme')
      previewElement.className = selct;
      previewElement.setAttribute('data-theme', selct)
    });
    function getTheme() {
      return previewElement.getAttribute('data-theme') || null;
    }
    return {
      getTheme,
    };
}

export function setupCardEditor(cardElement) {
  if(cardElement === null || cardElement === undefined) return null;

  cardElement.addEventListener('click', function (event){
    const getDB = event.target;

    if(getDB.hasAttribute('data-editable')){
      const elem = cardElement.querySelector('.editing');

      if(elem){
        elem.classList.remove("editing");
        elem.contentEditable = "false"
      }
      getDB.contentEditable = "true";
      getDB.classList.add("editing");
      getDB.focus();
    } else if(getDB === cardElement){
      const got = cardElement.querySelector('.editing');
      if(got){
        got.classList.remove("editing");
        got.contentEditable = "true"
      }
    }
  })

  function getContent(field){
    const getElem = cardElement.querySelector(`[data-editable="${field}"]`)
    if(!getElem) return null;

    return getElem.textContent;
  }
  return {
     getContent
  }

}
