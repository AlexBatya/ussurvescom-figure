
const {dialog} = require('electron');

const template = [
    {
      label: "Файл",
      submenu: [
        {
          label: "Открыть",
          click: async () => {
              const linkArray: any = await dialog.showOpenDialog({});
              const link: any = linkArray.filePaths[0];  
            //   console.log(link.toString('cp1251'));
              // const result: any = await weight(link);
              // console.log(result.time)
          }
        },
      ]
    },
    {
      label: "Обновления",
      submenu: [
        {
            
        }
      ]
    }
]

export default template;