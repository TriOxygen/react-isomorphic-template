import request from 'axios';

const API_URL = 'http://sc.dune/api';
const COURSE_ID = 1699;

class SteelCompass {
  getStructure() {
    return new Promise((resolve, reject) => {
      request.post(`${API_URL}/website`, {
        method: 'getCourseById',
        data: {
          id: COURSE_ID
        }
      }).then(courseResponse => {
        const { toc } = courseResponse.data.data;
        const pageIds = this.getPageIds(courseResponse.data.data.toc);
        const sections = {};
        request.all(pageIds.map(pageId => this.getPage(pageId))).then((pageResponses) => {
          pageResponses.forEach(res => {
            const page = res.data.data;
            sections[page.id] = {
              id: page.id,
              name: page.name,
              rows: page.pageRows
            };
          });
          const struct = this.webStructure(toc, sections);
          resolve(struct);
        }, error => {
          reject(error);
        });
      }, error => {
        reject(error);
      });
    });
  }

  webStructure(toc, sections) {
    return toc.map(section => {
      const [summary, ...rest] = section.pages;
      return {
        id: section.id,
        name: section.name,
        summary: sections[summary.id],
        sections: rest.map(page => {
          return sections[page.id];
        })
      }
    });
  }

  getPageIds(toc) {
    const pageIds = [];
    toc.forEach(section => {
      section.pages.forEach(page => {
        pageIds.push(page.id);
      });
    });
    return pageIds;
  }

  getPage(id) {
    return request.post(`${API_URL}/website`, {
      method: 'getPageById',
      data: {
        id
      }
    });
  }
}



export default new SteelCompass();