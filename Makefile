PHONY: github aws-sync aws-cache pudding

github:
	rm -rf docs
	cp -r public docs
	git add -A
	git commit -m "update github pages"
	git push

aws-sync:
	aws s3 sync public s3://pudding.cool/2020/05/wrestling --delete --cache-control 'max-age=31536000'

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/2020/05/wrestling*'	

pudding: aws-sync aws-cache