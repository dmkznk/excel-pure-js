export function createHeader(state = {}) {
  const title = state.titleState;
  return `<input type="text" class="input" value="${title}" />
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>

                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>`;
}
