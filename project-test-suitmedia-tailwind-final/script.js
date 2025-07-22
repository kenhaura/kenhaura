
let lastScroll = 0;
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;

  // Parallax banner
  const bannerText = document.querySelector('.banner-text');
  if (bannerText) {
    bannerText.style.transform = `translateY(${currentScroll * 0.4}px)`;
  }
});

let page = parseInt(localStorage.getItem('page')) || 1;
let perPage = parseInt(localStorage.getItem('perPage')) || 10;
let sort = localStorage.getItem('sort') || '-published_at';

const postList = document.getElementById('post-list');
const pagination = document.getElementById('pagination');
const perPageSelect = document.getElementById('perPage');
const sortSelect = document.getElementById('sortBy');

perPageSelect.value = perPage;
sortSelect.value = sort;

perPageSelect.addEventListener('change', () => {
  perPage = parseInt(perPageSelect.value);
  page = 1;
  localStorage.setItem('perPage', perPage);
  fetchData();
});

sortSelect.addEventListener('change', () => {
  sort = sortSelect.value;
  page = 1;
  localStorage.setItem('sort', sort);
  fetchData();
});

async function fetchData() {
  localStorage.setItem('page', page);
  localStorage.setItem('sort', sort);
  try {
    const url = `/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`;
    const res = await fetch(url);
    const json = await res.json();
    renderPosts(json.data);
    renderPagination(json.meta.last_page);
    document.getElementById('range').textContent = `${(page - 1) * perPage + 1}-${Math.min(json.meta.total, page * perPage)}`;
    document.getElementById('total').textContent = json.meta.total;
  } catch (error) {
    postList.innerHTML = '<p class="text-red-500">Failed to load data. Check API or proxy config.</p>';
  }
}

function renderPosts(posts) {
  postList.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'border rounded overflow-hidden shadow-sm hover:shadow-md transition flex flex-col';

    const img = document.createElement('img');
    img.src = post.medium_image.url;
    img.alt = post.title;
    img.loading = 'lazy';
    img.className = 'w-full object-cover aspect-[4/3]';

    const body = document.createElement('div');
    body.className = 'p-4 flex-grow flex flex-col';

    const title = document.createElement('h2');
    title.textContent = post.title;
    title.className = 'font-semibold text-base mb-2 line-clamp-3';

    const date = document.createElement('p');
    date.textContent = new Date(post.published_at).toLocaleDateString();
    date.className = 'text-sm text-gray-500 mt-auto';

    body.appendChild(title);
    body.appendChild(date);
    card.appendChild(img);
    card.appendChild(body);
    postList.appendChild(card);
  });
}

function renderPagination(lastPage) {
  pagination.innerHTML = '';
  for (let i = 1; i <= lastPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = \`px-3 py-1 border rounded \${i === page ? 'bg-orange-500 text-white' : 'bg-white text-black'}\`;
    btn.addEventListener('click', () => {
      page = i;
      fetchData();
    });
    pagination.appendChild(btn);
  }
}

document.addEventListener('DOMContentLoaded', fetchData);
