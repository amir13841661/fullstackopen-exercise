const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'test',
        name: 'test test',
        password: 'test',
      },
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'test2',
        name: 'test2 test2',
        password: 'test2',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    expect(page.getByText('Login')).not.toBeNull()
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {})
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginWith(page, 'test', 'test')
      await expect(page.getByTestId('userinfo')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.loginWith(page, 'test', 'test')
      await expect(page.getByTestId('userinfo')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('test title test author ')).toBeVisible()
    })
    describe('when a blog is created', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlog(page, 'test title', 'test author', 'test url')
        await helper.createBlog(
          page,
          'test2 title',
          'test2 author',
          'test2 url'
        )
      })
      test('blog can be liked', async ({ page }) => {
        await page
          .getByText('test title test author ')
          .getByRole('button', { name: 'view' })
          .click()
        const beforeLikes = await page.getByTestId('likes').allInnerTexts()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForResponse(
          (resp) =>
            resp.url().includes('/api/blogs/') &&
            resp.request().method() === 'PUT'
        )
        const afterLikes = await page.getByTestId('likes').allInnerTexts()
        await expect(afterLikes).not.toStrictEqual(beforeLikes)
      })
      test('blog can be deleted', async ({ page }) => {
        await page
          .getByText('test title test author ')
          .getByRole('button', { name: 'view' })
          .click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await page.waitForResponse(
          (resp) =>
            resp.url().includes('/api/blogs/') &&
            resp.request().method() === 'DELETE'
        )
        await expect(
          page.getByText('test title test author ')
        ).not.toBeVisible()
      })
      test('delete button is not visible to other users', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await helper.loginWith(page, 'test2', 'test2')
        await page
          .getByText('test title test author ')
          .getByRole('button', { name: 'view' })
          .click()
        expect(page.getByText('delete')).not.toBeVisible()
      })

      test('blogs are ordered based on their likes', async ({ page }) => {
        // await page.waitForResponse()
        await page
          .getByText('test2 title test2 author ')
          .getByRole('button', { name: 'view' })
          .click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForResponse(
          (resp) =>
            resp.url().includes('/api/blogs/') &&
            resp.request().method() === 'PUT'
        )
        await page.getByRole('button', { name: 'hide' }).click()

        const blogs = await page.getByTestId('blog').allInnerTexts()
        expect(blogs).toStrictEqual([
          'test2 title test2 author view',
          'test title test author view',
        ])
      })
    })
  })
})
