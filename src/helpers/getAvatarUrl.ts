// ** Helper function to generate avatar URL based on employee img property
const getAvatarUrl = (employee: UserType) => {
  // Use the images from the public/images folder
  if (employee.img) {
    return `/images/${employee.img}`;
  }

  // Fallback to UI Avatars API if no image is specified
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random&color=fff&size=64`;
};

export default getAvatarUrl;
