# Deployment Guide for GitHub Pages

## Prerequisites
- GitHub account
- Git installed locally
- Node.js 18+ installed

## Step-by-Step Deployment

### 1. Initial Setup

First, make sure you're in the project directory and have committed your changes:

```bash
cd PaperLastCheck
git add .
git commit -m "Initial commit: Paper Last Check application"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `PaperLastCheck`
2. Do NOT initialize with README, .gitignore, or license (we already have these)

### 3. Link Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/PaperLastCheck.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 4. Configure GitHub Pages

#### Option A: Using GitHub Actions (Recommended)

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. The workflow is already configured in `.github/workflows/deploy.yml`. You also need to configure your custom domain with your DNS provider.

#### DNS Configuration for `code.runzecai.com`

You need to go to your DNS provider (e.g., GoDaddy, Namecheap, Cloudflare) and add a `CNAME` record for `code.runzecai.com` pointing to your GitHub Pages URL, which is `YOUR_USERNAME.github.io`.

For example:
- **Type**: `CNAME`
- **Name**: `code`
- **Target/Value**: `YOUR_USERNAME.github.io.`
- **TTL**: 1 Hour (or as desired)

5. Push any change to trigger the deployment:
   ```bash
   git push origin main
   ```

#### Option B: Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The static files will be in the 'out' directory
# Deploy to gh-pages branch
git subtree push --prefix out origin gh-pages
```

### 5. Access Your Application

After deployment (takes 2-5 minutes), and after your DNS changes have propagated, your app will be available at:

```
https://code.runzecai.com/PaperLastCheck/
```

## Configuration Notes

### Base Path Configuration

The `next.config.js` is already configured with:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/PaperLastCheck' : '',
```

This ensures the app works correctly on GitHub Pages.

### Custom Domain (Optional)

If you want to use a custom domain:

1. A `CNAME` file has been added to the `public/` directory with `code.runzecai.com`.
2. Update DNS settings with your domain provider as described above.
3. Configure custom domain in GitHub Pages settings on GitHub by entering `code.runzecai.com`.

## Troubleshooting

### Issue: Page shows 404

- Check that GitHub Pages is enabled in repository settings
- Verify the source is set correctly (GitHub Actions or gh-pages branch)
- Wait a few minutes for deployment to complete

### Issue: Assets not loading

- Ensure `basePath` in `next.config.js` matches your repository name
- Clear browser cache and try again

### Issue: Workflow fails

- Check the Actions tab in your repository for error details
- Ensure Node.js version in workflow matches your local version
- Verify all dependencies are correctly listed in `package.json`

## Environment Variables

For local development, you can create a `.env.local` file:

```bash
# Not needed for production, but useful for local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Note: The Gemini API key is entered by users at runtime, not stored in environment variables.

## Updating the Application

To update the deployed application:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

If using GitHub Actions, the deployment will happen automatically. For manual deployment, run:

```bash
npm run build
git subtree push --prefix out origin gh-pages
```

## Security Considerations

- Never commit API keys to the repository
- The application only stores the API key in browser memory
- All processing happens client-side or via direct API calls to Gemini
- No backend server stores user data

## Performance Optimization

For better performance:

1. **Enable caching**: GitHub Pages automatically caches static assets
2. **Optimize PDFs**: Encourage users to upload optimized PDFs
3. **Rate limiting**: Gemini API has rate limits; consider implementing client-side throttling

## Monitoring

To monitor your deployed application:

1. Check GitHub Actions tab for build status
2. Monitor GitHub Pages status in repository settings
3. Use browser developer tools to debug client-side issues

## Rollback

To rollback to a previous version:

```bash
# Find the commit hash of the version you want
git log

# Reset to that commit
git reset --hard <commit-hash>
git push -f origin main
```

Note: Force pushing is generally not recommended. Consider creating a revert commit instead:

```bash
git revert <commit-hash>
git push origin main
```

## Support

For issues:
- Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- Review [GitHub Pages documentation](https://docs.github.com/pages)
- Check the repository Issues tab

## License

This project is open source and available under the MIT License.

