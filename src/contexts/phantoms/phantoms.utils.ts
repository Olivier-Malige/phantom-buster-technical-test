import type { IPhantoms } from '../../data/phantoms';

const extractCategoriesFromPhantoms = (phantoms: IPhantoms) => {
  const categories: string[] = [];

  phantoms.forEach((phantom) => {
    phantom.manifest.tags.categories.forEach((category) =>
      categories.push(category)
    );
  });

  return Array.from(new Set(categories));
};

export { extractCategoriesFromPhantoms };
