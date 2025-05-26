export const closeDialogButtonRef = (
  e: HTMLDivElement | null,
  callback: () => void,
) => {
  const closeBtn = e?.querySelector('button > span.sr-only')?.parentElement;
  closeBtn?.addEventListener('click', callback);
};
