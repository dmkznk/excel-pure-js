export function createHeader(state = {}) {
  const title = state.titleState;
  return `<input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>

                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>`;
}
