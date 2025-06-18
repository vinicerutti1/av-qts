// client/src/utils/formatDate.ts

/**
 * Formata um objeto Date para uma string no formato DD/MM/YYYY.
 * @param date - O objeto Date a ser formatado. Pode ser null ou undefined.
 * @returns A data formatada como string ou uma string vazia se a data for inválida.
 */
/*
export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) {
    return '';
  }

  // Converte para objeto Date se for uma string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `<span class="math-inline">\{day\}/</span>{month}/${year}`;
};
*/

// client/src/utils/formatDate.ts

/**
 * Formata um objeto Date para uma string no formato DD/MM/YYYY.
 * @param date - O objeto Date a ser formatado. Pode ser string, null ou undefined.
 * @returns A data formatada como string ou uma string vazia se a data for inválida.
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  // Esta verificação lida com null e undefined
  if (!date) {
    return '';
  }

  // Esta linha lida com datas que vêm como string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Esta verificação lida com datas inválidas (ex: new Date('abc'))
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }

  // Se tudo for válido, a formatação ocorre
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() é base 0
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};